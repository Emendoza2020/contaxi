import { Component, OnInit } from '@angular/core';
import { Auth } from '../../../services/auth';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {

  errorMessage: string = '';

  form!: FormGroup;

  constructor(private auth: Auth, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      termsAccepted: [false, Validators.requiredTrue]
    });
  }

  showPassword = false;

  login() {
    if (this.form.invalid) return;

    this.auth.login(this.form.value).subscribe({
      next: (resp: any) => {
        const rol = resp.rol;
        if (rol === 'admin') this.router.navigate(['/dashboard/admin']);
        if (rol === 'conductor') this.router.navigate(['/dashboard/conductor']);
        if (rol === 'pasajero') this.router.navigate(['/dashboard/pasajero']);
        this.errorMessage = '';
        console.log(rol);
      },

      error: (err) => {
        //console.error('Error al iniciar sesión', err);
        if (err.status === 500) {
          this.errorMessage = 'Error al conectar a la base de datos.';
        } else {
          this.errorMessage = 'Credenciales incorrectas. Por favor verifica tu usuario y contraseña.';
        }
      }
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  getError(controlName: string) {
    const control = this.form.get(controlName);
    return control && control.touched ? control.errors || {} : {};
  }
  get isSubmitDisabled(): boolean {
    return !this.form.valid;
  }

}

