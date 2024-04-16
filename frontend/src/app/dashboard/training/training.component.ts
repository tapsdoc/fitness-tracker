import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { CommonModule } from '@angular/common';
import * as fromRoot from '../../shared/store/app.reducer'
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
   selector: 'app-training',
   standalone: true,
   imports: [
      RouterOutlet,
      MatTabsModule,
      CurrentTrainingComponent,
      NewTrainingComponent,
      PastTrainingsComponent,
      CommonModule
   ],
   templateUrl: './training.component.html',
   styleUrl: './training.component.css'
})
export class TrainingComponent implements OnInit {
   
   currentTraining$!: Observable<boolean>;
   
   constructor(private store: Store<fromRoot.AppState>) { }
   
   ngOnInit() {
      this.currentTraining$ = this.store.select(fromRoot.getIsTraining);
   }
}
