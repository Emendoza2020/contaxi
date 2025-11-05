import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { Pasajero } from '../../../services/pasajero';

@Component({
  selector: 'app-reg-pasajero',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './reg-pasajero.html',
  styleUrl: './reg-pasajero.css'
})
export class RegPasajero {
  pasajer ={
    nombres: '',
    apellidos: '',
    ci: '',
    telefono: '',
    direccion: '',
    email: '',
    password: ''
  }


  constructor(private pasajero: Pasajero, private router: Router) {}

  registrarPasajero() {
    const data = { nombres: this.pasajer.nombres, apellidos: this.pasajer.apellidos, ci: this.pasajer.ci, telefono:this.pasajer.telefono, direccion: this.pasajer.direccion, email: this.pasajer.email, password: this.pasajer.password };
    this.pasajero.registroPasajero(data).subscribe({
      next: () => {
        alert('Pasajero registrado con éxito');
        this.router.navigate(['/login']);
      },
      error: () => alert('Error al registrar Pasajero ')
    });
  }

}
