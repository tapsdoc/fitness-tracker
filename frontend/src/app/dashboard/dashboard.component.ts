import { Component, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { HeaderComponent } from '../shared/header/header.component';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import * as fromApp from '../shared/store/app.reducer'
import { Store } from '@ngrx/store';
import { AuthResponse } from '../models/auth-response';
import * as Auth from '../shared/store/auth.actions';
import { AuthService } from '../service/auth.service';

@Component({
   selector: 'app-dashboard',
   standalone: true,
   imports: [
      MatSidenavModule,
      RouterModule,
      MatButtonModule,
      MatIconModule,
      MatToolbar,
      MatListModule,
      HeaderComponent,
      CommonModule
   ],
   templateUrl: './dashboard.component.html',
   styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
   
   isAuth$!: Observable<AuthResponse>;
   constructor (
      private authService: AuthService,
      private store: Store<fromApp.AppState>
   ) { }
   
   ngOnInit() {
      this.isAuth$ = this.store.select(fromApp.getIsAuth);
   }
   
   onLogout() {
      this.authService.logout().subscribe({
         next: () => {
            this.store.dispatch(Auth.LOGOUT());
         }
      })
   }
}
