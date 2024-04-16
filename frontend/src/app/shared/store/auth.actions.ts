import {createAction, props} from "@ngrx/store";
import { AuthResponse } from '../../models/auth-response';

export const LOGIN = createAction(
	'[Auth] LOGIN',
	props<{ payload: AuthResponse }>()
);

export const LOGOUT = createAction('[Auth] LOGOUT');
export const DEFAULT = createAction('Default')