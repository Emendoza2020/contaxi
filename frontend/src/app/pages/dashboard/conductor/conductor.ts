import { CommonModule } from '@angular/common';
import { Component, AfterViewInit  } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-conductor',
  imports: [CommonModule ],
  standalone: true,
  templateUrl: './conductor.html',
  styleUrl: './conductor.css'
})
export class Conductor implements AfterViewInit {

  stats = [
    { title: 'Mi Mapa', value: 532, icon: 'fa-users', color: 'bg-blue-500', route: '/usuarios' },
    { title: 'Mis Viajes', value: 76, icon: 'fa-car', color: 'bg-green-500' },
    { title: 'Mi Vehiculo', value: 1240, icon: 'fa-check', color: 'bg-yellow-500' },
    { title: 'Vehículos registrados', value: 12, icon: 'fa-flag', color: 'bg-red-500' },
  ];

  private map!: L.Map;

  ngAfterViewInit(): void {
    this.map = L.map('map').setView([-17.7833, -63.1821], 14);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png')
      .addTo(this.map);

    L.marker([-17.7833, -63.1821])
      .addTo(this.map)
      .bindPopup('Tu ubicación como conductor');
  }

}
