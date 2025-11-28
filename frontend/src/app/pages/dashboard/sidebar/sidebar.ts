import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Auth } from '../../../services/auth';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {

  private auth = inject(Auth);
   rol = this.auth.Rol;

  menu: any[] = [];

  constructor() {

    this.loadMenu();
  }

  loadMenu() {
    if (this.rol === 'admin') {
      this.menu = [
        { title: 'Dashboards', icon: 'fa-solid fa-home', children:[
          { icon: 'fa-solid fa-chart-line', title: 'Principal', route: '/dashboard/admin' },
        ]},
        { title: 'Usuarios', icon: 'fa-solid fa-users', children:[
            { icon: 'fa-solid fa-users', title: 'Usuarios', route: '/dashboard/usuarios' },
        ]
        },
        { icon: 'fa-solid fa-car-side', title: 'Conductores', route: '/dashboard/conductores' },
        { icon: 'fa-solid fa-user', title: 'Pasajeros', route: '/dashboard/admin/pasajeros' },
        { icon: 'fa-solid fa-file', title: 'Reportes', route: '/dashboard/admin/reportes' }
      ];
    }

    if (this.rol === 'conductor') {
      this.menu = [
        { icon: 'fa-solid fa-map', title: 'Mi Mapa', route: '/dashboard/conductor/mapa' },
        { icon: 'fa-solid fa-clock', title: 'Mis Viajes', route: '/dashboard/conductor/viajes' },
      ];
    }

    if (this.rol === 'pasajero') {
      this.menu = [
        { icon: 'fa-solid fa-taxi', title: 'Pedir Taxi', route: '/dashboard/pasajero/pedir' },
        { icon: 'fa-solid fa-clock', title: 'Historial', route: '/dashboard/pasajero/historial' },
      ];
    }
  }

}
