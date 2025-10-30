import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-conductor',
  standalone: true,
  imports: [ FormsModule, CommonModule, RouterLink],
  templateUrl: './conductor.html',
  styleUrl: './conductor.css'
})
export class Conductor {
   driver = {
    nombre: '',
    telefono: '',
    ciudad: '',
    vehiculo: '',
    placa: '',
    email: '',
    password: ''
  };

  licenciaPreview: string | ArrayBuffer | null = null;
  carnetPreview: string | ArrayBuffer | null = null;
  vehiculoPreview: string | ArrayBuffer | null = null;

  // Previsualizar archivos cargados
  onFileSelected(event: any, tipo: string) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        if (tipo === 'licencia') this.licenciaPreview = reader.result;
        if (tipo === 'carnet') this.carnetPreview = reader.result;
        if (tipo === 'vehiculo') this.vehiculoPreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    console.log('Datos del conductor:', this.driver);
    alert('✅ ¡Registro enviado correctamente!');
  }

}
