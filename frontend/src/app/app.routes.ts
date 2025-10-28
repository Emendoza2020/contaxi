import { Routes } from '@angular/router';
import { Login } from './pages/login/login/login';
import { Register } from './pages/register/register/register';
import { Dashboard } from './pages/dashboard/dashboard';
import { authGuard } from './guards/auth-guard';
import { Roles } from './pages/dashboard/roles/roles/roles';
import { Users } from './pages/dashboard/users/users/users';
import { Inicio } from './pages/home/inicio/inicio';

export const routes: Routes = [
  { path: '', component: Inicio },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  {
    path:'dashboard', component: Dashboard, canActivate: [authGuard],
    children: [
      { path: 'roles', component: Roles },
      { path: 'usuarios', component: Users },
      { path: '', redirectTo: 'usuarios', pathMatch: 'full' }
    ]
  },
  // { path: '**', redirectTo: 'login' }

];
