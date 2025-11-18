import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export interface UserProfile {
id_usuario?: number;
email?: string;
estado?: string;
persona?: {
id_persona?: number;
nombres?: string;
apellidos?: string;
ci?: string;
telefono?: string;
direccion?: string;
};
rol?: {
id_rol?: number;
nombre?: string;
descripcion?: string;
};
}
@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css'
})
export class Perfil {
@Input() user: UserProfile | null = null;

  onEdit() {
console.log('Editar perfil', this.user);
}


onLogout() {
console.log('Cerrar sesión');
}

}
