import { createAction } from '@ngrx/store';

export const START_LOADING = createAction("[Ui] Start Loading");
export const STOP_LOADING =createAction("[Ui] Stop Loading");
export const DEFAULT = createAction("[Ui] Default");