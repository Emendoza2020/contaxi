import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Rol } from '../../../../services/rol';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './roles.html',
  styleUrl: './roles.css'
})
export class Roles {

  roles: any[] = [];
  nuevoRol = '';

  constructor(private authService: Rol) {}

  ngOnInit() {
    this.cargarRoles();
  }

  cargarRoles() {
    this.authService.getRoles().subscribe({
      next: (data) => this.roles = data,
      error: (err) => console.error(err)
    });
  }

  agregarRol() {
    if (this.nuevoRol.trim() !== '') {
      this.authService.addRol({ nombre: this.nuevoRol }).subscribe({
        next: () => {
          this.nuevoRol = '';
          this.cargarRoles();
        }
      });
    }
  }
}
