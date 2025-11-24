import { Solicitudes } from './pages/indriver/solicitudes/solicitudes';
import { Routes } from '@angular/router';
import { Login } from './pages/login/login/login';
import { Register } from './pages/register/register/register';
import { Dashboard } from './pages/dashboard/dashboard';
import { Roles } from './pages/dashboard/roles/roles/roles';
import { Users } from './pages/dashboard/users/users/users';
import { Inicio } from './pages/home/inicio/inicio';
import { RegConductor } from './pages/register/reg-conductor/reg-conductor';
import { RegPasajero } from './pages/register/reg-pasajero/reg-pasajero';

import { Admin } from './pages/dashboard/admin/admin';
import { Conductor } from './pages/dashboard/conductor/conductor';
import { Pasajero } from './pages/dashboard/pasajero/pasajero';

import { authGuard } from './guards/auth-guard';
import { Role } from './guards/role';
import { Perfil } from './pages/dashboard/perfil/perfil';

export const routes: Routes = [
  { path: '', component: Inicio },
  { path: 'conductor', component: Conductor },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'register-conductor', component: RegConductor},
  { path: 'register-pasajero', component: RegPasajero},

  { path: 'solicitudes', component: Solicitudes },
  { path: 'roles', component: Roles },
  { path: 'perfil', component: Perfil },
  { path: '', redirectTo: 'usuarios', pathMatch: 'full' },
  {
    path:'dashboard', component: Dashboard, canActivate: [authGuard],
    children: [
      { path: 'admin', component: Admin, canActivate: [Role], data: { rol: 'admin' }},
      { path: 'usuarios', component: Users, canActivate: [Role], data: { rol: 'admin' }},
      { path: 'conductor', component: Conductor, canActivate: [Role], data: { rol: 'conductor' }},
      { path: 'dashboard/pasajero', component: Pasajero, canActivate: [Role], data: { rol: 'pasajero' }}
    ]
  },

  { path: '**', redirectTo: '' }
];
