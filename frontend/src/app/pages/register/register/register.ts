import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../../services/auth';
import { Router, RouterLink } from '@angular/router';

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
  email = '';
  password = '';

  constructor(private auth: Auth, private router: Router) {}

  registrar() {
    const data = { nombres: this.nombres, apellidos: this.apellidos, email: this.email, password: this.password };
    this.auth.register(data).subscribe({
      next: () => {
        alert('Usuario registrado con éxito');
        this.router.navigate(['/']);
      },
      error: () => alert('Error al registrar usuario')
    });
  }
}
