import { createReducer, on } from '@ngrx/store';
import { DEFAULT, LOGIN, LOGOUT } from './auth.actions';
import { AuthResponse } from '../../models/auth-response';

export const initialState: AuthState = {
	user: null
};

export const authReducer = createReducer(
	initialState,
	on(LOGIN, (state, action) => {
		const user: AuthResponse = {
			username: action.payload.username,
			role: action.payload.role,
			accessToken: action.payload.accessToken,
			refreshToken: action.payload.refreshToken
		}
		return {
			...state,
			user: user
		}
	}),
	on(LOGOUT, (state) => {
		return {
			...state,
			user: null
		}
	}),
	on(DEFAULT, (state) => {
		return state
	})
);


export const getIsAuth = (state: AuthState): AuthResponse => state.user!;

export interface AuthState {
	user: AuthResponse | null;
}