import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { Auth } from '../../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  nombres = '';
  apellidos = '';
  ci = '';
  telefono = '';
  direccion = '';
  email = '';
  password = '';
  rolNombre = '';

  constructor(private auth: Auth, private router: Router) {}

  registrar() {
    const data = { nombres: this.nombres, apellidos: this.apellidos, ci: this.ci, telefono:this.telefono, direccion: this.direccion, email: this.email, password: this.password, rolNombre: this.rolNombre };
    this.auth.register(data).subscribe({
      next: () => {
        alert('Usuario registrado con éxito');
        this.router.navigate(['/login']);
      },
      error: () => alert('Error al registrar usuario ')
    });
  }
}
