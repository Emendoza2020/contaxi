import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Conductor } from '../../../../services/conductor';

@Component({
  selector: 'app-listar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listar.html',
  styleUrl: './listar.css'
})
export class Listar implements OnInit {

  conductores: any[] = []; // Para almacenar los datos de los conductores

  constructor(private conductor: Conductor) { }

  ngOnInit(): void {
    this.conductor.obtenerConductores().subscribe({
      next: (data) => {
        this.conductores = data;  // Asigna los datos obtenidos a la variable 'conductores'
        console.log(this.conductores);  // Para ver los datos obtenidos en la consola
      },
      error: (err) => {
        console.error('Error al obtener los conductores:', err);  // Si hay un error en la petición
      }
    });

  }

  editarConductor() {

  }

  eliminarConductor() {
  }
}
