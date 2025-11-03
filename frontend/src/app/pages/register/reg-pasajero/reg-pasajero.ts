import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../../services/auth';

@Component({
  selector: 'app-reg-pasajero',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './reg-pasajero.html',
  styleUrl: './reg-pasajero.css'
})
export class RegPasajero {
  form: FormGroup;

  constructor(private fb: FormBuilder, private auth: Auth, private router: Router) {
    this.form = this.fb.group({
      nombres: [''], apellidos: [''], ci: [''], telefono: [''],
      direccion: [''], email: [''], password: ['']
    });
  }

  register() {
    // this.auth.registerPasajero(this.form.value).subscribe(() => this.router.navigate(['/login']));
  }

}
