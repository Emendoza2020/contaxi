import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Viaje } from '../../../services/viaje';
import { Auth } from '../../../services/auth';
import { UserState } from '../../../services/user-state';

@Component({
  selector: 'app-pasajero',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './pasajero.html',
  styleUrl: './pasajero.css'
})

export class Pasajero implements OnInit {
  private fb = inject(FormBuilder);
  private viajeService = inject(Viaje);
  private auth = inject(Auth);
  private userState = inject(UserState);

  idPasajero: number | null = null;

  form!: FormGroup;
  mensaje = '';
  error = '';

  ngOnInit(): void {
    this.form = this.fb.group({
      origen: ['', [Validators.required, Validators.maxLength(150)]],
      destino: ['', [Validators.required, Validators.maxLength(150)]],
      distancia_km: [null],
      costo_estimado: [null]
    });

    this.userState.pasajerId$.subscribe(id => {
      this.idPasajero = id;
      console.log('ID del pasajerossss:', this.idPasajero); // Verifica que el id sea correcto
    });

    console.log(this.idPasajero);
  }


  solicitar() {
    this.mensaje = '';
    this.error = '';

    if (this.form.invalid) {
      this.error = 'Completa los campos requeridos.';
      this.form.markAllAsTouched();
      return;
    }

    const body = {
      id_region: this.auth.Region || 1,   // Verifica que esto no sea 'null' o 'undefined'
      id_pasajero: this.auth.IdPasajero || 6,     // Verifica que esto no sea 'null' o 'undefined'
      origen: this.form.value.origen || '',
      destino: this.form.value.destino || '',
      distancia_km: this.form.value.distancia_km || 0,
      costo_estimado: this.form.value.costo_estimado || 0
    };

    console.log('BODY ENVIADO DESDE ANGULAR:', body);

    this.viajeService.crearSolicitud(body).subscribe({
      next: (res) => {
        this.mensaje = 'Solicitud enviada correctamente.';
        this.form.reset();
      },
      error: (err) => {
        console.error('ERROR DESDE ANGULAR:', err);
        this.error = err.error?.message || 'Error al enviar la solicitud.';
      }
    });
  }
}
