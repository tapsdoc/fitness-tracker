import { createAction, props } from '@ngrx/store';
import { Exercise } from '../../models/exercise';

export const SET_AVAILABLE_EXERCISES = createAction(
	
	"[Training] Available Exercises",
	(payload: Exercise[]) => ({ payload })
	);

export const SET_PAST_TRAININGS = createAction(
	"[Training] Past Trainings",
	(payload: Exercise[]) => ({ payload })
	);

export const START_TRAINING = createAction(
	"[Training] Start Training",
	(payload: number) => ({ payload })
);

export const STOP_TRAINING = createAction("[Training] Stop Training");
export const DEFAULT = createAction("[Training] Default");
