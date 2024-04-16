import { Component, OnInit } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatError, MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from '../../shared/loading-spinner/loading-spinner.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../../shared/snack-bar/snack-bar.component';
import { Store } from '@ngrx/store';
import { AuthData } from '../../models/auth-data';
import * as fromRoot from '../../shared/store/app.reducer';
import * as Auth from '../../shared/store/auth.actions';
import * as Ui from '../../shared/store/ui.actions';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [
		MatCheckbox,
		MatError,
		MatFormField,
		MatHint,
		MatInput,
		MatLabel,
		ReactiveFormsModule,
		CommonModule,
		LoadingSpinnerComponent
	],
	templateUrl: './login.component.html',
	styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
	
	loginForm!: FormGroup;
	loading$!: Observable<boolean>;
	duration = 5;
	
	constructor(
		private authService: AuthService,
		private router: Router,
		private _snackBar: MatSnackBar,
		private store: Store<fromRoot.AppState>
	) { }
	
	ngOnInit() {
		this.loading$ = this.store.select(fromRoot.getIsLoading);
		this.loginForm = new FormGroup<any>({
			email: new FormControl('', [Validators.required, Validators.email]),
			password: new FormControl('', [Validators.required])
		});
	}
	
	onSubmit() {
		const request: AuthData = {
			email: this.loginForm.controls['email'].value,
			password: this.loginForm.controls['password'].value
		}
		
		this.store.dispatch(Ui.START_LOADING());
		this.authService.login(request).subscribe({
			next: user => {
				this.authService.setToken(user);
				this.loginForm.reset();
				this.store.dispatch(Ui.STOP_LOADING());
				this.store.dispatch(Auth.LOGIN({ payload: user }))
				this.router.navigate(['training']).then();
			},
			error: err => {
				this.store.dispatch(Ui.STOP_LOADING());
				this._snackBar.openFromComponent(SnackBarComponent, {
					data: err.error.message,
					duration: this.duration * 1000
				});
			}
		});
	}
}
