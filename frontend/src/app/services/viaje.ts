import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Viaje {

  private http = inject(HttpClient);
  private api = 'http://localhost:4000/api/solicitud';


  crearSolicitud(body: any): Observable<any> {
    return this.http.post(`${this.api}/crear`, body);  // Asegúrate de que el endpoint es correcto
  }

  getPendientes(): Observable<any> {
    return this.http.get(this.api); // o `${this.api}/pendientes` según tu backend
  }

  obtenerSolicitudesParaConductor(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/viajes`); // Endpoint para obtener solicitudes pendientes
  }

  // Aceptar la solicitud de viaje
  aceptarSolicitud(idSolicitud: number, idConductor: number): Observable<any> {
    const body = {
      id_solicitud: idSolicitud,
      id_conductor: idConductor
    };
    return this.http.put<any>(`${this.api}/aceptar`, body);  // Endpoint para aceptar la solicitud
  }
}
