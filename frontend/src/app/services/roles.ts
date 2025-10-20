import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Roles {
  private http = inject(HttpClient);
  private api = 'http://localhost:4000/api/roles';

  private get headers() {
    const token = localStorage.getItem('token');
    return { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) };
  }

  getRoles() {
    return this.http.get(this.api, this.headers);
  }
}
