//import { Pasajero } from './services/pasajero';
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

// import { Conductor } from './pages/indriver/conductor/conductor';
import { Pasajeros } from './pages/indriver/pasajeros/pasajeros';

import { authGuard } from './guards/auth-guard';
import { Role } from './guards/role';
import { Perfil } from './pages/dashboard/perfil/perfil';
import { Listar } from './pages/dashboard/conductor/listar/listar';

export const routes: Routes = [
  { path: '', component: Inicio },
  //{ path: 'conductor', component: Conductor },
  // { path: 'pasajero', component: Pasajero },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'register-conductor', component: RegConductor },
  { path: 'register-pasajero', component: RegPasajero },

  { path: 'solicitudes', component: Solicitudes },
  // { path: 'pasajeros', component: Pasajeros },
  { path: 'roles', component: Roles },
  // { path: 'perfil/:id', component: Perfil },
  { path: '', redirectTo: 'usuarios', pathMatch: 'full' },
  {
    path: 'dashboard', component: Dashboard, canActivate: [authGuard],
    children: [
      { path: 'admin', component: Admin, canActivate: [Role], data: { rol: ['admin'] } },
      { path: 'usuarios', component: Users, canActivate: [Role], data: { rol: ['admin'] } },
      { path: 'perfil/:id', component: Perfil, canActivate: [Role], data: { rol: ['admin', 'conductor', 'pasajero'] } },
      { path: 'conductor', component: Conductor, canActivate: [Role], data: { rol: ['admin', 'conductor'] } },
      { path: 'pasajero', component: Pasajeros, canActivate: [Role], data: { rol: ['admin', 'pasajero'] } },
      { path: 'conductor-list', component: Listar, canActivate: [Role], data: { rol: ['admin'] } }
    ]
  },
  { path: '**', redirectTo: '' }
];
