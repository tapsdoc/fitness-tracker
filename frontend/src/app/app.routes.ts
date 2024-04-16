import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { authGuard } from './auth/auth.guard';
import { TrainingComponent } from './dashboard/training/training.component';

export const routes: Routes = [
   { path: '', redirectTo: '/welcome', pathMatch: 'full' },
   { path: 'welcome', component: WelcomeComponent },
   { path: 'login', component: LoginComponent },
   { path: 'signup', component: SignUpComponent },
   { path: 'training', component: TrainingComponent, canActivate: [authGuard] },
];
