import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { AuthData } from '../models/auth-data';
import { HttpClient } from '@angular/common/http';
import { server } from '../../../environment'
import { tap } from 'rxjs';
import { AuthResponse } from '../models/auth-response';
import { Store } from '@ngrx/store';
import * as fromRoot from '../shared/store/app.reducer';
import * as Auth from '../shared/store/auth.actions'
import { Router } from '@angular/router';


@Injectable({
	providedIn: 'root'
})
export class AuthService {
	
	private url = server.url + '/api/v1/auth'
	constructor(
		private http: HttpClient,
		private store: Store<fromRoot.AppState>,
		private router: Router
	) {
	}
	
	register(request: User) {
		return this.http.post<AuthResponse>(`${this.url}/register`, request)
		.pipe(
			tap((value) => {
				this.store.dispatch(Auth.LOGIN({ payload: value }))
			})
		);
	}
	
	login(request: AuthData) {
		return this.http.post<AuthResponse>(`${this.url}/login`, request)
		.pipe(
			tap((value) => {
				this.store.dispatch(Auth.LOGIN({ payload: value }));
			})
		);
	}
	
	autoLogin() {
		const userData: AuthResponse = JSON.parse(localStorage.getItem('user')!);
		if (!userData) {
			return;
		}
		
		if (userData.accessToken) {
			this.store.dispatch(Auth.LOGIN({ payload: userData }));
		}
	}
	
	logout() {
		return this.http.post(`${this.url}/logout`, {})
		.pipe(
			tap(() => {
				this.store.dispatch(Auth.LOGOUT());
				localStorage.removeItem('user');
				this.router.navigate(['/login']).then();
			})
		);
	}
	
	
	setToken(user: AuthResponse) {
		localStorage.setItem('user', JSON.stringify(user));
	}
}
