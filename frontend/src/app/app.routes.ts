import { Solicitudes } from './pages/indriver/solicitudes/solicitudes';
import { Routes } from '@angular/router';
import { Login } from './pages/login/login/login';
import { Register } from './pages/register/register/register';
import { Dashboard } from './pages/dashboard/dashboard';
import { Roles } from './pages/dashboard/roles/roles/roles';
import { Users } from './pages/dashboard/users/users/users';
import { Inicio } from './pages/home/inicio/inicio';
import { Conductor } from './pages/indriver/conductor/conductor';
import { RegConductor } from './pages/register/reg-conductor/reg-conductor';
import { RegPasajero } from './pages/register/reg-pasajero/reg-pasajero';
import { Pasajero } from './pages/indriver/pasajero/pasajero';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', component: Inicio },
  { path: 'conductor', component: Conductor },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'register-conductor', component: RegConductor},
  { path: 'register-pasajero', component: RegPasajero},
  {
    path:'dashboard', component: Dashboard, canActivate: [authGuard],
    children: [
      { path: 'conductor', component: Conductor },
      { path: 'pasajero', component: Pasajero },
      { path: 'solicitudes', component: Solicitudes },
      { path: 'roles', component: Roles },
      { path: 'usuarios', component: Users },
      { path: '', redirectTo: 'usuarios', pathMatch: 'full' }
    ]
  },
   { path: '**', redirectTo: '' }

];
