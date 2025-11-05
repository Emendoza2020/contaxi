import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, switchMap } from 'rxjs';

import { Conductor } from '../../../services/conductor';

@Component({
  selector: 'app-reg-conductor',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule ],
  templateUrl: './reg-conductor.html',
  styleUrl: './reg-conductor.css'
})
export class RegConductor {
  conductorForm!: FormGroup;
  ciExists = false;
  emailExists = false;

  constructor(private fb: FormBuilder, private cs: Conductor, private http: HttpClient) {}

  ngOnInit(): void {
    this.conductorForm = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      ci: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      direccion: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      licencia: ['', Validators.required],
      categoria_licencia: ['', Validators.required],
      vehiculos: this.fb.array([this.createVehiculo()])
    });

    // Validación en tiempo real del CI
    this.conductorForm.get('ci')?.valueChanges.pipe(
      debounceTime(500),
      switchMap(value => this.cs.validateCI(value))
    ).subscribe(res => this.ciExists = res.exists);

    // Validación en tiempo real del email
    this.conductorForm.get('email')?.valueChanges.pipe(
      debounceTime(500),
      switchMap(value => this.cs.validateEmail(value))
    ).subscribe(res => this.emailExists = res.exists);
  }

  createVehiculo(): FormGroup {
    return this.fb.group({
      placa: ['', Validators.required],
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      anio: [new Date().getFullYear(), [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
      color: ['', Validators.required],
      capacidad: [4, [Validators.required, Validators.min(1)]]
    });
  }

  get vehiculos(): FormArray {
    return this.conductorForm.get('vehiculos') as FormArray;
  }

  addVehiculo() { this.vehiculos.push(this.createVehiculo()); }
  removeVehiculo(index: number) { if (this.vehiculos.length > 1) this.vehiculos.removeAt(index); }

  submitForm() {
    if (this.conductorForm.invalid || this.ciExists || this.emailExists) {
      this.conductorForm.markAllAsTouched();
      return;
    }

    this.http.post('http://localhost:4000/api/conductor/registro', this.conductorForm.value)
      .subscribe({
        next: () => alert('Conductor registrado exitosamente'),
        error: () => alert('Error al registrar conductor')
      });
  }

  getError(controlName: string) {
  const control = this.conductorForm.get(controlName);
  return control && control.touched ? control.errors || {} : {};
}
}
