import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { LoadingSpinnerComponent } from '../../shared/loading-spinner/loading-spinner.component';
import { SnackBarComponent } from '../../shared/snack-bar/snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../shared/store/app.reducer';
import * as Ui from '../../shared/store/ui.actions'
import { Observable } from 'rxjs';

@Component({
   selector: 'app-sign-up',
   standalone: true,
   imports: [
      MatFormFieldModule,
      MatInputModule,
      ReactiveFormsModule,
      MatDatepickerModule,
      MatCheckboxModule,
      CommonModule,
      LoadingSpinnerComponent
   ],
   templateUrl: './sign-up.component.html',
   styleUrls: ['./sign-up.component.css'],
   providers: [],
   host: {ngSkipHydration: 'true'},
})
export class SignUpComponent implements OnInit {
   
   signupForm!: FormGroup;
   email!: FormControl;
   password!: FormControl;
   firstName!: FormControl;
   lastName!: FormControl;
   loading$!: Observable<boolean>;
   
   constructor (
      private authService: AuthService,
      private router: Router,
      private _snackBar: MatSnackBar,
      private store: Store<fromRoot.AppState>
   ) { }
   
   ngOnInit() {
      this.loading$ = this.store.select(fromRoot.getIsLoading);
      this.signupForm = new FormGroup<any>({
         firstName: new FormControl('', [Validators.required]),
         lastName: new FormControl('', [Validators.required]),
         email: new FormControl('', [Validators.required, Validators.email]),
         password: new FormControl('', [Validators.required, Validators.minLength(4)]),
         confirm: new FormControl(false, [Validators.required])
      });
      
      this.email = this.signupForm.get('email') as FormControl;
      this.password = this.signupForm.get('password') as FormControl;
      this.firstName = this.signupForm.get('firstName') as FormControl;
      this.lastName = this.signupForm.get('lastName') as FormControl;
      
   }
   
   onSubmit() {
      const request: User = {
         firstName: this.signupForm.controls['firstName'].value,
         lastName: this.signupForm.controls['lastName'].value,
         email: this.signupForm.controls['email'].value,
         password: this.signupForm.controls['password'].value
      }
      
      this.store.dispatch(Ui.START_LOADING());
      this.authService.register(request).subscribe({
         next: user => {
            this.authService.setToken(user);
            this.signupForm.reset();
            this.router.navigate(['training']).then();
            this.store.dispatch(Ui.STOP_LOADING());
         },
         error: err => {
            this.store.dispatch(Ui.STOP_LOADING());
            this._snackBar.openFromComponent(SnackBarComponent, {
               data: err.error.message,
               duration: 5000
            });
         }
      })
   }
}