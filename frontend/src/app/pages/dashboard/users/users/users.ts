import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Roles } from '../../../../services/roles';
import { User } from '../../../../services/user';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.html',
  styleUrl: './users.css'
})

export class Users implements OnInit {
  usuarios: any[] = [];
  roles: any[] = [];

  constructor(private usersService: User, private rolesService: Roles) {}

  ngOnInit() {
    this.rolesService.getRoles().subscribe((r: any) => (this.roles = r));
    this.usersService.getUsers().subscribe((u: any) => (this.usuarios = u));
  }

  actualizarRol(usuario: any) {
    this.usersService.updateUserRole(usuario.id, usuario.id_rol).subscribe(() => alert('Rol actualizado'));
  }
}
