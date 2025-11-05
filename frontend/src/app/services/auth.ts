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
  private api = 'http://localhost:4000/api/auth';

  login(data: any){
    return this.http.post(`${this.api}/login`, data).pipe(
      tap((res: any) => localStorage.setItem('token', res.token))
    );
  }

  register(data: any) {
    return this.http.post(`${this.api}/register`, data);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

}
