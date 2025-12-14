import { Component, inject } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { Auth } from '../../../services/auth';
import { Router, RouterLink } from '@angular/router';
import { UserState } from '../../../services/user-state';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TitleCasePipe, CommonModule, RouterLink ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

   private auth = inject(Auth);
  private userState = inject(UserState);
  private router = inject(Router);

  rol = '';
  nombre = '';

  toggleNotifications = false;
  toggleProfile = false;
  toggleMenuMobile = false;

  usuario: any = {};

  ngOnInit(): void {

    // --- Cargar valores desde Auth ---
    this.rol = this.auth.Rol;
    this.nombre = this.auth.Nombre;

    const id = this.auth.Id;

    console.log("ID desde Auth:", id);

    // --- Evitar null y evitar guardar 0 ---
    if (id && id !== 0) {
      console.log("Guardando ID real:", id);
      this.userState.setUserId(id);
    } else {
      console.warn("Header: No se encontró ID del usuario aún.");
    }

    // Construir objeto de usuario
    this.usuario = {
      nombre: this.nombre,
      rol: this.rol,
      id: id
    };
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }

}
