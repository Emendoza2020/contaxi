import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Auth } from '../services/auth';


@Injectable({ providedIn: 'root' })
export class Role implements CanActivate {

  constructor(private auth: Auth, private router: Router) {}

  canActivate(route: any): boolean {
    const allowedRoles = route.data['rol'] as string[]; // ['admin', 'conductor', 'pasajero']
    const userRole = this.auth.Rol;

     if (!allowedRoles || allowedRoles.length === 0) {
    return true;
  }

  // si el rol del usuario está dentro de la lista, dejo pasar
  if (allowedRoles.includes(userRole)) {
    return true;
  }

  // si no, lo saco del juego
  this.router.navigate(['/auth/login']); // o a otra página
  return false;
  }
}
