import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Auth } from '../services/auth';


@Injectable({ providedIn: 'root' })
export class Role implements CanActivate {

  constructor(private auth: Auth, private router: Router) {}

  canActivate(route: any): boolean {
    const rolNecesario = route.data['rol'];
    const rolUsuario = this.auth.Rol;

    if (rolUsuario === rolNecesario) {
      return true;
    }

    this.router.navigate(['/auth/login']);
    return false;
  }
}
