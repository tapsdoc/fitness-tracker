import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from './auth.reducer'
import * as fromUi from './ui.reducer'
import * as fromTraining from './training.reducer'
import { TrainingState } from './training.reducer';

export interface AppState {
	auth: fromAuth.AuthState;
	ui: fromUi.UiState
	training: fromTraining.TrainingState
}

export const appReducer: ActionReducerMap<AppState> = {
	auth: fromAuth.authReducer,
	ui: fromUi.uiReducer,
	training: fromTraining.trainingReducer
}
export const getAuthState = createFeatureSelector<fromAuth.AuthState>('auth');
export const getIsAuth = createSelector(getAuthState, fromAuth.getIsAuth);

export const getUiState = createFeatureSelector<fromUi.UiState>('ui');
export const getIsLoading = createSelector(getUiState, fromUi.getIsLoading);

export const getTrainingState = createFeatureSelector<TrainingState>('training');
export const getAvailableExercises = createSelector(getTrainingState, (state: TrainingState) => state.availableExercises);
export const getFinishedExercises = createSelector(getTrainingState, (state: TrainingState) => state.pastTrainings);
export const getActiveTraining = createSelector(getTrainingState, (state: TrainingState) => state.currentExercise);
export const getIsTraining = createSelector(getTrainingState, (state: TrainingState) => state.currentExercise != null);