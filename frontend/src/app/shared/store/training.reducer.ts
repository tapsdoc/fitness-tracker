import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { Exercise } from '../../models/exercise';
import {
	SET_AVAILABLE_EXERCISES,
	SET_PAST_TRAININGS,
	START_TRAINING,
	STOP_TRAINING,
	DEFAULT
} from './training.actions';

const initialState: TrainingState = {
	currentExercise: null,
	availableExercises: [
		{ id: 1, name: 'Crunches', duration: 30, calories: 8 },
		{ id: 2, name: 'Touch Toes', duration: 180, calories: 15 },
		{ id: 3, name: 'Side Lunges', duration: 120, calories: 18 },
		{ id: 4, name: 'Burpees', duration: 60, calories: 8 }
	],
	pastTrainings: []
}

export const trainingReducer = createReducer(
	initialState,
	on(SET_PAST_TRAININGS, (state, action) => {
		return {
			...state,
			pastTrainings: action.payload
		}
	}),
	on(SET_AVAILABLE_EXERCISES, (state, action) => {
		return {
			...state,
			availableExercises: action.payload
		}
	}),
	on(START_TRAINING, (state, action) => {
		const exercise: Exercise = state.availableExercises.find(ex => ex.id == action.payload)!;
		return {
			...state,
			currentExercise: { ...exercise}
		}
	}),
	on(STOP_TRAINING, (state) => {
		return {
			...state,
			currentExercise: null
		}
	}),
	on(DEFAULT, (state) => state)
);

export interface TrainingState {
	currentExercise: Exercise | null;
	availableExercises: Exercise[];
	pastTrainings: Exercise[];
}