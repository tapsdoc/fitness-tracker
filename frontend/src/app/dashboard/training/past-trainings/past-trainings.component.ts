import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Exercise } from '../../../models/exercise';
import { CommonModule } from '@angular/common';
import { TrainingService } from '../../../service/training.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../../../shared/snack-bar/snack-bar.component';
import * as fromRoot from '../../../shared/store/app.reducer'
import * as Training from '../../../shared/store/training.actions'
import { Store } from '@ngrx/store';

@Component({
	selector: 'app-past-trainings',
	standalone: true,
	imports: [
		MatFormFieldModule,
		MatInputModule,
		MatTableModule,
		MatSortModule,
		MatPaginatorModule,
		CommonModule
	],
	templateUrl: './past-trainings.component.html',
	styleUrl: './past-trainings.component.css'
})
export class PastTrainingsComponent implements OnInit, OnDestroy, AfterViewInit {
	
	pageIndex = 0;
	totalElements = 0;
	pageSize = 10;
	
	displayedColumns: string[] = ['id', 'name', 'duration', 'calories', 'date', 'state'];
	dataSource = new MatTableDataSource<Exercise>();
	
	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;
	private subs!: Subscription;
	
	constructor(
		private trainingService: TrainingService,
		private _snackBar: MatSnackBar,
		private store: Store<fromRoot.AppState>
	) {
	}
	
	ngOnInit() {
		this.fetchPastTrainings();
	}
	
	private fetchPastTrainings() {
		this.subs = this.trainingService.fetchExercises(this.pageIndex, this.pageSize).subscribe({
			next: exercises => {
				this.dataSource.data = exercises?.content;
				this.totalElements = exercises?.totalElements;
				this.store.dispatch(Training.SET_PAST_TRAININGS(exercises?.content));
			},
			error: err => {
				const message = "Internal Server Error";
				
				if (err.error.error == message) {
					this._snackBar.openFromComponent(SnackBarComponent, {
						data: "An error occurred!",
						duration: 5000
					});
				} else {
					this._snackBar.openFromComponent(SnackBarComponent, {
						data: err.error.message,
						duration: 5000
					});
				}
			}
		});
	}
	
	ngAfterViewInit() {
		this.dataSource.sort = this.sort;
	}
	
	applyFilter(event: Event) {
		const searchInput = (event.target as HTMLInputElement).value;
		if (searchInput.trim() === '') {
			return;
		}
		
		this.trainingService.search(searchInput).subscribe({
			next: data => {
				this.dataSource.data = data;
				this.store.dispatch(Training.SET_PAST_TRAININGS(data));
			},
			error: err => {
				const message = "Internal Server Error";
				if (err.error.error == message) {
					this._snackBar.openFromComponent(SnackBarComponent, {
						data: "An error occurred!",
						duration: 5000
					});
				} else {
					this._snackBar.openFromComponent(SnackBarComponent, {
						data: err.error.message,
						duration: 5000
					});
				}
			}
		})
	}
	
	handlePageEvent(e: PageEvent) {
		this.pageIndex = e.pageIndex;
		this.pageSize = e.pageSize;
		this.fetchPastTrainings();
	}
	
	ngOnDestroy() {
		this.subs.unsubscribe();
	}
}
