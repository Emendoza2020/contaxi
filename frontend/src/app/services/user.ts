import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class User {
  private http = inject(HttpClient);
  private api = 'http://localhost:4000/api/usuarios';
  id: any;

  private get headers() {
    const token = localStorage.getItem('token');
    return { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) };
  }

  getUsers() {
    return this.http.get(this.api, this.headers);
  }

  listarUsuarios(): Observable<any> {
    return this.http.get<any>(`${this.api}/listar`, this.headers);
  }

  obtenerUsuario(id: number): Observable<any> {
    return this.http.get(`${this.api}/${id}`, this.headers);
  }

  crearUsuario(data: any): Observable<any> {
    return this.http.post(`${this.api}/registrar`, data, this.headers);
  }

  actualizarUsuario(id: number, data: any): Observable<any> {
    return this.http.put(`${this.api}/actualizar/${id}`, data, this.headers);
  }

  eliminarUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.api}/eliminar/${id}`, this.headers);
  }


  updateUserRole(id: number, id_rol: number) {
    return this.http.put(`${this.api}/${id}`, { id_rol }, this.headers);
  }

  actualizarEstado(id: number, estado: string) {
    return this.http.put(`${this.api}/estado/${id}`, { estado }, this.headers);
  }



  // Validar CI
  validateCI(ci: string): Observable<{ exists: boolean }> {
    return this.http.post<{ exists: boolean }>(`${this.api}/validate-ci`, { ci }, this.headers);
  }
  // Validar email
  validateEmail(email: string): Observable<{ exists: boolean }> {
    return this.http.post<{ exists: boolean }>(`${this.api}/validate-email`, { email }, this.headers);
  }

  perfilUsuario(id: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get(`${this.api}/${id}`, { headers });
  }
}
