import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import * as Auth from '../../shared/store/auth.actions';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import { AuthResponse } from '../../models/auth-response';

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterLink, CommonModule],
	templateUrl: './header.component.html',
	styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
	
	@Output() sideNavToggle = new EventEmitter<void>();
	isAuth$!: Observable<AuthResponse>;
	
	constructor(
		private authService: AuthService,
		private store: Store<fromApp.AppState>
	) {
	}
	
	ngOnInit() {
		this.isAuth$ = this.store.select(fromApp.getIsAuth);
	}
	
	toggle() {
		this.sideNavToggle.emit();
	}
	
	onLogout() {
		this.authService.logout().subscribe({
			next: () => {
				this.store.dispatch(Auth.LOGOUT());
			}
		})
	}
}
