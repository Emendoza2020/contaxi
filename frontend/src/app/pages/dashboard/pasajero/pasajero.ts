import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-pasajero',
  standalone: true,
  imports: [],
  templateUrl: './pasajero.html',
  styleUrl: './pasajero.css'
})
export class Pasajero implements AfterViewInit {
  map!: L.Map;

  ngAfterViewInit(): void {
    this.map = L.map('mapPasajero').setView([-17.78, -63.18], 15);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png')
      .addTo(this.map);
  }

  solicitar() {
    alert('Taxi solicitado 🚕');
  }

}
