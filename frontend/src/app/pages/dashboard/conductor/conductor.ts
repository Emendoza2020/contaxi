import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { Auth } from '../../../services/auth';
import { Viaje } from '../../../services/viaje';

@Component({
  selector: 'app-conductor',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './conductor.html',
  styleUrl: './conductor.css'
})
export class Conductor implements AfterViewInit {

  stats = [
    { title: 'Mi Mapa', value: 532, icon: 'fa-users', color: 'bg-blue-500', route: '/usuarios' },
    { title: 'Mis Viajes', value: 76, icon: 'fa-car', color: 'bg-green-500' },
    { title: 'Mi Vehiculo', value: 1240, icon: 'fa-check', color: 'bg-yellow-500' },
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

  solicitudes: any[] = [];
  error: string = '';
  mensaje: string = '';
  rol = '';
  getUserId = '';

  constructor(private auth: Auth, private viaje: Viaje) { }

  ngOnInit(): void {
    const rol = this.auth.Rol;
    if (rol !== 'conductor') {
      this.error = 'No tienes permiso para ver las solicitudes de viaje';
      return;
    }

    //Obtener solicitudes de viaje para conductores
    this.obtenerSolicitudes();
  }

  obtenerSolicitudes() {
    this.viaje.obtenerSolicitudesParaConductor().subscribe({
      next: (res) => {
        if (res.length > 0) {
          this.solicitudes = res;
        } else {
          this.error = 'No hay solicitudes de viaje pendientes';
        }
      },
      error: (err) => {
        this.error = 'Error al obtener las solicitudes';
        console.error('ERROR DESDE ANGULAR:', err);
      }
    });
  }


  // aceptarSolicitud(idSolicitud: number) {
  //   const idConductor = this.auth.Id();  // Obtener el id del conductor

  //   this.viaje.aceptarSolicitud(idSolicitud, idConductor).subscribe({
  //     next: (res) => {
  //       this.mensaje = 'Solicitud aceptada correctamente';
  //       this.obtenerSolicitudes(); // Actualizar la lista de solicitudes
  //     },
  //     error: (err) => {
  //       this.error = 'Error al aceptar la solicitud';
  //       console.error('ERROR DESDE ANGULAR:', err);
  //     }
  //   });
  //}

}
