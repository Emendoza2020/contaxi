import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../../services/user';
import { debounceTime, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class Users {

  usuarios: any[] = [];
  modalOpen = false;
  editar = false;
  usuarioId!: number;
  usuarioForm!: FormGroup;

  ciExists = false;
  emailExists = false;

  constructor(private fb: FormBuilder, private usersService: User, private http: HttpClient) { }

  roles = [
    { id_rol: 1, nombre: 'admin' },
    { id_rol: 2, nombre: 'pasajero' },
    { id_rol: 3, nombre: 'conductor' },
  ];
  ngOnInit(): void {

    this.cargarUsuarios();


    this.usuarioForm = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      ci: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      id_rol: [null, Validators.required],
      estado: ['activo', Validators.required]
    });

    // Validación en tiempo real del CI
    this.usuarioForm.get('ci')?.valueChanges.pipe(
      debounceTime(500),
      switchMap(value => this.usersService.validateCI(value))
    ).subscribe(res => this.ciExists = res.exists);

    // Validación en tiempo real del email
    this.usuarioForm.get('email')?.valueChanges.pipe(
      debounceTime(500),
      switchMap(value => this.usersService.validateEmail(value))
    ).subscribe(res => this.emailExists = res.exists);
  }

  cargarUsuarios() {
    this.usersService.listarUsuarios().subscribe({
      next: data => {
        this.usuarios = data;
      }
    });
  }

  abrirModalCrear() {
    this.editar = false;
    this.usuarioForm.reset({ estado: 'activo' });
    this.modalOpen = true;
  }

  abrirModalEditar(usuario: any) {
    this.editar = true;
    this.usuarioId = usuario.id_usuario;

    this.usuarioForm.patchValue({
      nombres: usuario.Persona?.nombres,
      apellidos: usuario.Persona?.apellidos,
      ci: usuario.Persona?.ci,
      telefono: usuario.Persona?.telefono,
      direccion: usuario.Persona?.direccion,
      email: usuario.email,
      id_rol: usuario.Rol?.id_rol,
      estado: usuario.estado
    });

    this.modalOpen = true;
  }

  guardar() {
    if (this.usuarioForm.invalid) {
      this.usuarioForm.markAllAsTouched();
      console.log('Formulario inválido', this.usuarioForm.value, this.usuarioForm.errors);
      return;
    }

    // IMPORTANTE: getRawValue() incluye campos deshabilitados
    const data = this.usuarioForm.getRawValue();
    console.log('Enviando:', data);

    // Si id_rol viene como string desde <select>, conviértelo a number
    data.id_rol = Number(data.id_rol);

    const req$ = this.editar
      ? this.usersService.actualizarUsuario(this.usuarioId, data)
      : this.usersService.crearUsuario(data);

    req$.subscribe({
      next: (res) => {
        console.log('OK:', res);
        alert(this.editar ? 'Usuario actualizado con éxito' : 'Usuario creado con éxito');
        this.cargarUsuarios();
        this.modalOpen = false;
      },
      error: (err) => {
        console.error('ERROR creando/actualizando:', err);
        alert(err?.error?.message ?? 'Error inesperado al guardar');
      }
    });
  }

  submitForm() {
    if (this.usuarioForm.invalid || this.ciExists || this.emailExists) {
      this.usuarioForm.markAllAsTouched();
      return;
    }

    this.http.post('http://localhost:4000/api/usuarios/registrar', this.usuarioForm.value)
      .subscribe({
        next: () => {
          alert('Usuario registrado exitosamente');
          //this.router.navigate(['/login']);
        },
        error: () => alert('Error al registrar Usuario')
      });
  }
  getError(controlName: string) {
    const control = this.usuarioForm.get(controlName);
    return control && control.touched ? control.errors || {} : {};
  }

  eliminar(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.usersService.eliminarUsuario(id).subscribe({
        next: () => { this.cargarUsuarios(); alert('Usuario eliminado con éxito'); },
        error: (err) => { console.error('Error al eliminar usuario', err); alert('No se pudo eliminar el usuario'); }
      });
    }
  }

  toggleEstado(user: any) {
    const nuevoEstado = user.estado === 'activo' ? 'inactivo' : 'activo';

    this.usersService.actualizarEstado(user.id_usuario, nuevoEstado).subscribe({
      next: (res) => {
        user.estado = nuevoEstado; // Actualizar visualmente
        //console.log('Estado actualizado:', res);
        alert('Estado actualizado')
      },
      error: (err) => {
        console.error('Error al actualizar estado', err);
        alert('No se pudo actualizar el estado');
      }
    });
  }
}
