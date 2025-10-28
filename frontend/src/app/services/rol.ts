import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Rol {
  private http = inject(HttpClient);
  private api = 'http://localhost:4000/api/roles';

  private get headers() {
    const token = localStorage.getItem('token');
    return { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) };
  }

  getRoles() {
    return this.http.get<any[]>(this.api, this.headers);
  }


  // getRoles(): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.api}`);
  // }

  addRol(rol: any): Observable<any> {
    return this.http.post(this.api, rol, this.headers);
  }
}
