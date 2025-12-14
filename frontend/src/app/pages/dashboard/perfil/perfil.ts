import { UserState } from './../../../services/user-state';
import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Auth } from '../../../services/auth';
import { User } from '../../../services/user';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

interface Persona {
  id_persona: number;
  nombres: string;
  apellidos: string;
  ci: string;
  telefono: string;
  direccion: string;
  fecha_registro: string;
}

interface Rol {
  id_rol: number;
  nombre: string;
  descripcion: string;
  fecha_registro: string | null;
}

interface Usuario {
  id_usuario: number;
  id_persona: number;
  id_rol: number;
  email: string;
  estado: string;
  fecha_registro: string;
  persona: Persona;
  rol: Rol;
}

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css'
})

export class Perfil {

  usuario: Usuario | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    //private auth = inject(Auth),
    private route: ActivatedRoute,
    private user: User,
    private UserState: UserState
  ) { }

  ngOnInit(): void {

    const id = this.UserState.getUserId();
    console.log("ID recibido", id);

    if (!id) {
      this.error = "No se encontró el ID del usuario.";
      this.loading = false;
      return;
    }

    this.cargarPerfil(id);
    const idParam = this.route.snapshot.paramMap.get('id');


    if (!idParam) {
      // opción A: tomar el id del usuario logueado (localStorage, token, etc.)
      const storedId = localStorage.getItem('userId');
      if (storedId) {
        this.cargarPerfil(Number(storedId));
      } else {
        this.error = 'No se encontró el ID de usuario.';
        this.loading = false;
      }
      return;
    }

    this.cargarPerfil(Number(idParam));
  }

  cargarPerfil(id: number): void {
    this.loading = true;
    this.error = null;

    this.user.perfilUsuario(id).subscribe({
      next: (data: any) => {
        this.usuario = data;   // adapta según tu API
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.error = err.message;
        this.loading = false;
      }
    });

    // roles = {
    //   nombre: this.auth.Nombre,
    //   rol: this.auth.Rol
    // };

  }

  get iniciales(): string {
    if (!this.usuario) return '';
    const n = this.usuario.persona?.nombres?.[0] ?? '';
    const a = this.usuario.persona?.apellidos?.[0] ?? '';
    return (n + a).toUpperCase();
  }

  get estadoClase(): string {
    return this.usuario?.estado === 'activo'
      ? 'bg-emerald-100 text-emerald-700'
      : 'bg-red-100 text-red-700';
  }

}
