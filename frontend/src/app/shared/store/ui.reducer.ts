import { createReducer, on } from '@ngrx/store';
import { DEFAULT, START_LOADING, STOP_LOADING } from './ui.actions';

const initialState: UiState = {
	isLoading: false
}

export const uiReducer = createReducer(
	initialState,
	on(START_LOADING, (state, action): UiState => {
		return {
			isLoading: true
		}
	}),
	on(STOP_LOADING, (state, action): UiState => {
		return {
			isLoading: false
		}
	}),
	on(DEFAULT, (state) => state)
)

export const getIsLoading = (state: UiState) => state.isLoading;

export interface UiState {
	isLoading: boolean;
}