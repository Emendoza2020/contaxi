import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Dashboard } from '../../../services/dashboard';

@Component({
  selector: 'app-admin',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin implements OnInit {

  stats = [
    { title: 'Usuarios registrados', value: 0, icon: 'fa-users', color: 'bg-blue-500', route: '/usuarios' },
    { title: 'Conductores activos', value: 0, icon: 'fa-car', color: 'bg-green-500' },
    { title: 'Pasajeros', value: 0, icon: 'fa-check', color: 'bg-yellow-500' },
    { title: 'Vehículos registrados', value: 0, icon: 'fa-flag', color: 'bg-red-500' },
  ];

  constructor(private dashboard: Dashboard) { }

  ngOnInit(): void {
    this.getDashboardData();
  }

  // Obtener los datos para los contadores
  getDashboardData(): void {
    this.dashboard.obtenerDatosDashboard().subscribe({
      next: (data) => {
        this.stats[0].value = data.usuariosRegistrados;
        this.stats[1].value = data.conductoresActivos;
        this.stats[2].value = data.pasajerosRegistrados;
        this.stats[3].value = data.vehiculosRegistrados;
      },
      error: (err) => {
        console.error('Error al obtener los datos del dashboard', err);
      }
    });
  }
}
