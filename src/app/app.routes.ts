import { Routes } from '@angular/router';
import { LoginComponent } from './account/login/login.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { RegisterComponent } from './account/register/register.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', pathMatch: "full", component: DashboardComponent, canActivate: [authGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
];
