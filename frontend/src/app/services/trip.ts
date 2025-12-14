import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface RideRequest {
  userId?: string;
  origin: { lat: number, lng: number } | string;
  destination: { lat: number, lng: number } | string;
  passengers?: number;
  priceOffer?: number;
  meta?: any;
}
@Injectable({
  providedIn: 'root'
})
export class Trip {
  private base = 'http://localhost:4000'; // cambia al backend real
  constructor(private http: HttpClient) { }

  requestRide(payload: RideRequest): Observable<any> {
    return this.http.post(`${this.base}/api/rides/request`, payload);
  }
}
