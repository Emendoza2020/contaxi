import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Pasajero {
  private http = inject(HttpClient);
  private api = 'http://localhost:4000/api/pasajeros';

  registroPasajero(data: any) {
    return this.http.post(`${this.api}/registro`, data);
  }
}
