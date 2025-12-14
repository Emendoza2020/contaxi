import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Conductor {
  private api = 'http://localhost:4000/api/conductor';

  constructor(private http: HttpClient) { }

  // Validar CI
  validateCI(ci: string): Observable<{ exists: boolean }> {
    return this.http.post<{ exists: boolean }>(`${this.api}/validate-ci`, { ci });
  }
  // Validar email
  validateEmail(email: string): Observable<{ exists: boolean }> {
    return this.http.post<{ exists: boolean }>(`${this.api}/validate-email`, { email });
  }

  // registerConductor(data: any): Observable<any> {
  //   return this.http.post(`${this.api}/registro`, data);
  // }

  getPerfilConductor(idUsuario: number): Observable<any> {
    return this.http.get(`${this.api}/perfil/${idUsuario}`);
  }

  obtenerConductores(): Observable<any> {
    return this.http.get<any>(`${this.api}/listar`);  // Petición GET al backend
  }

}
