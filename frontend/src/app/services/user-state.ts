import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserState {

  private userIdSubject = new BehaviorSubject<number | null>(null);
  private pasajerIdSubject = new BehaviorSubject<number | null>(null);

  userId$ = this.userIdSubject.asObservable();
  pasajerId$ = this.pasajerIdSubject.asObservable();

  setUserId(id: number) {
    console.log("ID guardado:", id);
    this.userIdSubject.next(id);
    localStorage.setItem('userId', id.toString());
  }

  getUserId(): number | null {
    const saved = localStorage.getItem('userId');
    return saved ? Number(saved) : null;
  }

  setPasajeroId(id: number) {
    console.log("ID Pasajero guardado:", id);
    this.pasajerIdSubject.next(id);
    localStorage.setItem('pasajeroId', id.toString());
  }

  getpasajeroId(): number | null {
    const saved = localStorage.getItem('pasajeroId');
    return saved ? Number(saved) : null;
  }








}
