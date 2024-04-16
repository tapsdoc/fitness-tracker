import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Exercise } from '../../../models/exercise';
import { TrainingService } from '../../../service/training.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import * as fromRoot from '../../../shared/store/app.reducer'
import { Store } from '@ngrx/store';
import { LoadingSpinnerComponent } from '../../../shared/loading-spinner/loading-spinner.component';

@Component({
   selector: 'app-new-training',
   standalone: true,
   imports: [MatCardModule, MatButtonModule, MatInputModule, MatSelectModule, CommonModule, ReactiveFormsModule, LoadingSpinnerComponent],
   templateUrl: './new-training.component.html',
   styleUrl: './new-training.component.css'
})
export class NewTrainingComponent implements OnInit {
   
   exercises$!: Observable<Exercise[]>;
   isLoading$!: Observable<boolean>;
   form!: FormGroup;
   
   constructor (
      private trainingService: TrainingService,
      private store: Store<fromRoot.AppState>
   ) { }
   
   ngOnInit() {
      this.isLoading$ = this.store.select(fromRoot.getIsLoading);
      this.exercises$ = this.store.select(fromRoot.getAvailableExercises);
      this.form = new FormGroup<any>({
         exercise: new FormControl('', [Validators.required])
      });
   }
   
   onStartTraining() {
      const id = this.form.controls['exercise'].value
      this.trainingService.startExercise(id);
   }
   
   fetchExercises() {
      this.trainingService.fetchAvailableExercises();
   }
}
