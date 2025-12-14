import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private http = inject(HttpClient);
  private router = inject(Router);
  private region: number | null = null;
  private api = 'http://localhost:4000/api/auth';

  login(data: any) {
    return this.http.post(`${this.api}/login`, data).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('rol', res.rol);
        localStorage.setItem('id', res.usuario.id_usuario);
        this.region = Number(localStorage.getItem('region'));
        localStorage.setItem('id_pasajero', res.usuario.id_pasajero || '0');
      })
    );
  }

  get Token(): string {
    return localStorage.getItem('token') ?? '';
  }

  get Rol(): string {
    return localStorage.getItem('rol') ?? '';
  }

  get Nombre(): string {
    return localStorage.getItem('nombre') ?? '';
  }

  get Id(): number | null {
    const id = localStorage.getItem('id');
    return id ? Number(id) : null;
  }

  get IdPasajero(): number {
    return Number(localStorage.getItem('id_pasajero'));  // Obtenerlo de localStorage
  }

  get Region(): number {
    return this.region ?? 1;
  }
  register(data: any) {
    return this.http.post(`${this.api}/register`, data);
  }

  getUserId(): number | null {
    const userId = localStorage.getItem('userId');
    return userId ? Number(userId) : null;  // Retorna el ID del conductor desde el localStorage
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    this.router.navigate(['/']);
    localStorage.clear();
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }


}
