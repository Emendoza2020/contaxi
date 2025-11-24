import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-admin',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin {

  stats = [
    { title: 'Usuarios registrados', value: 532, icon: 'fa-users', color: 'bg-blue-500', route: '/usuarios' },
    { title: 'Conductores activos', value: 76, icon: 'fa-car', color: 'bg-green-500' },
    { title: 'Viajes completados', value: 1240, icon: 'fa-check', color: 'bg-yellow-500' },
    { title: 'Vehículos registrados', value: 12, icon: 'fa-flag', color: 'bg-red-500' },
  ];

}
