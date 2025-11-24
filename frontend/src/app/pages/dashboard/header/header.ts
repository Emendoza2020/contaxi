import { Component, inject } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { Auth } from '../../../services/auth';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TitleCasePipe, CommonModule, RouterLink ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

  private auth = inject(Auth);

  constructor() {}

  rol = this.auth.Rol;
  nombre = this.auth.Nombre;

  usuario = {
    nombre: this.auth.Nombre,
    rol: this.auth.Rol
  };

}
