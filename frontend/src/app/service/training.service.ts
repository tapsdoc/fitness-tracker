import { Injectable } from '@angular/core';
import { Exercise } from '../models/exercise';
import { take, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { server } from '../../../environment';
import * as fromRoot from '../shared/store/app.reducer'
import * as Training from '../shared/store/training.actions'
import { Store } from '@ngrx/store';
import * as Ui from '../shared/store/ui.actions';

@Injectable({
	providedIn: 'root'
})
export class TrainingService {
	
	private url = server.url + '/api/v1/training';
	
	constructor(
		private http: HttpClient,
		private store: Store<fromRoot.AppState>
	) { }
	
	fetchExercises(page: number, size: number) {
		return this.http.get<any>(`${this.url}/past-training-with-pagination?page=${page}&size=${size}`);
	}
	
	startExercise(id: number) {
		this.store.dispatch(Training.START_TRAINING(id));
	}
	
	completeExercise() {
		this.store.select(fromRoot.getActiveTraining)
			.pipe(
				take(1)
			).subscribe({
				next: exercise =>{
					const request = {
						name: exercise!.name,
						duration: exercise!.duration,
						calories: exercise!.calories,
						state: 'COMPLETED'
					}
					this.addDataToDatabase(request).subscribe({
						next: value => {
							exercise = value;
						},
						error: err => console.log(err)
					});
				}
			});
	}
	
	cancelExercise(progress: number) {
		this.store.select(fromRoot.getActiveTraining)
			.pipe(
				take(1)
			)
			.subscribe({
				next: exercise =>{
					const request = {
						name: exercise!.name,
						duration: exercise!.duration * (progress / 100),
						calories: exercise!.calories * (progress / 100),
						state: 'CANCELLED'
					}
					this.addDataToDatabase(request).subscribe({
						next: value => {
							exercise = value;
						},
						error: err => console.log(err)
					});
				}
			});
	}
	
	fetchAvailableExercises() {
		this.store.dispatch(Ui.START_LOADING());
		this.store.select('training').subscribe({
			next: state => {
				this.store.dispatch(Training.SET_AVAILABLE_EXERCISES(state.availableExercises));
			}
		});
		this.store.dispatch(Ui.STOP_LOADING());
	}
	
	search(filterValue: string) {
		return this.http.get<Exercise[]>(`${this.url}/search/${filterValue}`);
	}
	
	private addDataToDatabase(request: any) {
		return this.http.post<Exercise>(`${this.url}/add-training`, request)
		.pipe(
			tap(() => {
				this.store.dispatch(Training.STOP_TRAINING())
			})
		);
	}
}
