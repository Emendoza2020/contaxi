import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Dashboard {

  private apiUrl = 'http://localhost:4000/api/dashboard';  // Cambia esta URL a la de tu API

  constructor(private http: HttpClient) { }

  // Método para obtener los datos del dashboard
  obtenerDatosDashboard(): Observable<any> {
    return this.http.get<any>(this.apiUrl);  // Llamada al backend para obtener los datos
  }

}
