import { Component, Inject } from '@angular/core';
import {
	MAT_SNACK_BAR_DATA,
	MatSnackBarAction,
	MatSnackBarActions,
	MatSnackBarLabel,
	MatSnackBarRef
} from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

@Component({
	selector: 'app-snack-bar',
	standalone: true,
	imports: [MatButtonModule, MatSnackBarLabel, MatSnackBarActions, MatSnackBarAction],
	templateUrl: './snack-bar.component.html',
	styleUrl: './snack-bar.component.css'
})
export class SnackBarComponent {
	constructor(
		public snackBarRef: MatSnackBarRef<SnackBarComponent>,
		@Inject(MAT_SNACK_BAR_DATA) public message: string
	) { }
}
