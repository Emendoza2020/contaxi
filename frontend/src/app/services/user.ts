import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class User {
  private http = inject(HttpClient);
  private api = 'http://localhost:4000/api/usuarios';

  private get headers() {
    const token = localStorage.getItem('token');
    return { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) };
  }

  getUsers() {
    return this.http.get(this.api, this.headers);
  }

  updateUserRole(id: number, id_rol: number) {
    return this.http.put(`${this.api}/${id}`, { id_rol }, this.headers);
  }
}
