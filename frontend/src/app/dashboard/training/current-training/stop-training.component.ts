import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
   selector: 'app-stop-training',
   template: `
		 <div class="px-4 my-2">
			 <h2 mat-dialog-title>Are you sure?</h2>
			 <mat-dialog-content>
            <p>You already got {{ progress }}%</p>
          </mat-dialog-content>
			 <mat-dialog-actions>
				 <button mat-button [mat-dialog-close]="true">Yes</button>
				 <button mat-button [mat-dialog-close]="false">No</button>
			 </mat-dialog-actions>
		 </div>
   `,
   standalone: true,
   imports: [MatDialogModule, MatButtonModule],
   providers: []
})
export class StopTrainingComponent implements OnInit {
   
   progress = 0;
   
   constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
   
   ngOnInit() {
      this.progress = this.data.progress;
   }
}