import { Component, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training.component';
import { TrainingService } from '../../../service/training.service';
import * as fromRoot from '../../../shared/store/app.reducer'
import { Store } from '@ngrx/store';
import { take } from 'rxjs';

@Component({
	selector: 'app-current-training',
	standalone: true,
	imports: [MatProgressSpinnerModule, MatButtonModule],
	templateUrl: './current-training.component.html',
	styleUrl: './current-training.component.css'
})
export class CurrentTrainingComponent implements OnInit {
	
	progress = 0;
	timer!: any;
	
	constructor(
		private dialog: MatDialog,
		private trainingService: TrainingService,
		private store: Store<fromRoot.AppState>
	) {
	}
	
	ngOnInit() {
		this.startOrResumeTimer();
	}
	
	onStop() {
		clearInterval(this.timer);
		const dialogRef = this.dialog.open(StopTrainingComponent, {
			data: {
				progress: this.progress
			}
		});
		
		dialogRef.afterClosed().subscribe({
			next: result => {
				if (result) {
					this.trainingService.cancelExercise(this.progress);
				} else {
					this.startOrResumeTimer();
				}
			}
		})
	}
	
	private startOrResumeTimer() {
		this.store.select(fromRoot.getActiveTraining)
         .pipe(
            take(1)
         ).subscribe({
            next: exercise => {
               const step = exercise!.duration! / 100 * 1000;
               this.timer = setInterval(() => {
                  if (this.progress < 100) {
                     this.progress = this.progress + 1;
                  } else {
                     this.trainingService.completeExercise();
                     clearInterval(this.timer);
                  }
               }, step);
            }
         });
	}
}
