import { Auth } from './../../../services/auth';
import { Component, AfterViewInit, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { Viaje } from '../../../services/viaje';
import { debounceTime, distinctUntilChanged, switchMap, catchError, of } from 'rxjs';

@Component({
  selector: 'app-pasajeros',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './pasajeros.html',
  styleUrls: ['./pasajeros.css']
})
export class Pasajeros implements AfterViewInit, OnInit {
  private auth = inject(Auth);
  private viajeService = inject(Viaje);
  private http = inject(HttpClient);

  mensaje = '';
  error = '';

  viajeForm: FormGroup;

  // FormControls para autocompletado
  origenControl = new FormControl('');
  destinoControl = new FormControl('');

  sugerenciasOrigen: any[] = [];
  sugerenciasDestino: any[] = [];

  map!: L.Map;
  routingControl!: L.Routing.Control;

  distanciaKm = 0;
  costo = 0;
  tarifaPorKm = 2;

  // Coordenadas y marcadores
  origenLatLng!: L.LatLng;
  destinoLatLng!: L.LatLng;
  markerOrigen!: L.Marker;
  markerDestino!: L.Marker;
  carMarker!: L.Marker;

  iconOrigen = L.icon({
    iconUrl: 'assets/origen.png',
    iconSize: [35, 45],
    iconAnchor: [17, 45]
  });

  iconDestino = L.icon({
    iconUrl: 'assets/destino.png',
    iconSize: [35, 45],
    iconAnchor: [17, 45]
  });

  carIcon = L.icon({
    iconUrl: 'assets/car.png',
    iconSize: [40, 40],
    iconAnchor: [20, 20]
  });

  constructor(private fb: FormBuilder) {
    this.viajeForm = this.fb.group({
      origen: ['', Validators.required],
      destino: ['', Validators.required],
      distancia: [{ value: '', disabled: true }],
      costo: [{ value: '', disabled: true }]
    });
  }

  ngOnInit(): void {
    // Autocompletado ORIGEN
    this.origenControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => this.buscarDireccionHttp(value || '')),
      catchError(err => {
        console.error('Error autocompletado origen:', err);
        return of([]);
      })
    ).subscribe((data: any[]) => this.sugerenciasOrigen = data);

    // Autocompletado DESTINO
    this.destinoControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => this.buscarDireccionHttp(value || '')),
      catchError(err => {
        console.error('Error autocompletado destino:', err);
        return of([]);
      })
    ).subscribe((data: any[]) => this.sugerenciasDestino = data);
  }

  ngAfterViewInit(): void {
    this.map = L.map('map').setView([-17.7833, -63.1821], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(this.map);
  }

  // Llamada a Nominatim
  buscarDireccionHttp(texto: string) {
    if (!texto || texto.length < 3) return of([]);
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(texto)}&limit=5`;
    return this.http.get<any[]>(url, { headers: { 'Accept-Language': 'es' } });
  }

  // Selección de sugerencia
  seleccionarSugerencia(item: any, tipo: 'origen' | 'destino'): void {
    const latLng = L.latLng(+item.lat, +item.lon);

    if (tipo === 'origen') {
      this.origenLatLng = latLng;
      this.viajeForm.patchValue({ origen: item.display_name });
      this.origenControl.setValue(item.display_name, { emitEvent: false });
      this.sugerenciasOrigen = [];
      if (this.markerOrigen) this.map.removeLayer(this.markerOrigen);
      this.markerOrigen = L.marker(latLng, { icon: this.iconOrigen }).addTo(this.map);
    } else {
      this.destinoLatLng = latLng;
      this.viajeForm.patchValue({ destino: item.display_name });
      this.destinoControl.setValue(item.display_name, { emitEvent: false });
      this.sugerenciasDestino = [];
      if (this.markerDestino) this.map.removeLayer(this.markerDestino);
      this.markerDestino = L.marker(latLng, { icon: this.iconDestino }).addTo(this.map);
    }

    if (this.origenLatLng && this.destinoLatLng) this.calcularRuta();
  }

  // Calcular ruta y costo
  calcularRuta(): void {
    if (!this.origenLatLng || !this.destinoLatLng) return;

    if (this.routingControl) this.map.removeControl(this.routingControl);

    this.routingControl = L.Routing.control({
      waypoints: [this.origenLatLng, this.destinoLatLng],
      router: L.Routing.osrmv1({
        serviceUrl: 'https://router.project-osrm.org/route/v1',
      }),
      show: false,
      addWaypoints: false,
      fitSelectedRoutes: false,
      draggableWaypoints: false,
      lineOptions: {
        styles: [{ color: '#2563eb', weight: 6 }],
      },
      createMarker: () => null as any,
    }).addTo(this.map);

    this.routingControl.on('routesfound', (e: L.Routing.RoutesFoundEvent) => {
      const route = e.routes[0];

      this.distanciaKm = route.summary.totalDistance / 1000;
      this.costo = this.distanciaKm * this.tarifaPorKm;

      // Actualizamos el formulario con los valores calculados
      this.viajeForm.patchValue({
        distancia: this.distanciaKm.toFixed(2),
        costo: this.costo.toFixed(2),
      });

      const bounds = L.latLngBounds(route.coordinates);
      this.map.fitBounds(bounds, { padding: [50, 50] });

      this.animarAuto(route);
    });

    (this.routingControl as any).on('routingerror', (err: any) => {
      console.error('Error al calcular la ruta:', err);
      this.error = 'No se pudo calcular la ruta.';
    });
  }

  // Animación auto
  animarAuto(route: L.Routing.Route): void {
    if (this.carMarker) this.map.removeLayer(this.carMarker);
    const coords = route.coordinates;
    let i = 0;
    this.carMarker = L.marker(coords[0], { icon: this.carIcon }).addTo(this.map);

    const mover = () => {
      if (i < coords.length) {
        this.carMarker.setLatLng(coords[i]);
        i++;
        requestAnimationFrame(mover);
      }
    };
    mover();
  }

  // Enviar solicitud
  enviarSolicitud(): void {
    const raw = this.viajeForm.getRawValue(); // 👈 CLAVE

    const id_region = this.auth.Region ?? 1;
    const id_pasajero = this.auth.IdPasajero ?? 0;
    const origen = raw.origen;
    const destino = raw.destino;
    const distancia = parseFloat(raw.distancia) || 0;
    const costo = parseFloat(raw.costo) || 0;

    console.log('RAW FORM:', raw);
    console.log('Auth Region:', id_region);
    console.log('Auth IdPasajero:', id_pasajero);

    // Validación obligatoria
    if (!id_region || !id_pasajero || !origen || !destino) {
      this.error = 'Faltan datos obligatorios.';
      return;
    }

    const payload = {
      id_region,
      id_pasajero,
      origen,
      destino,
      distancia: +distancia.toFixed(2),
      costo: +costo.toFixed(2)
    };

    console.log('Payload enviado:', payload);

    this.viajeService.crearSolicitud(payload).subscribe({
      next: () => {
        this.mensaje = 'Solicitud enviada correctamente.';
        this.error = '';

        this.viajeForm.reset({
          origen: '',
          destino: '',
          distancia: '',
          costo: ''
        });

        this.origenControl.setValue('');
        this.destinoControl.setValue('');
        this.distanciaKm = 0;
        this.costo = 0;
      },
      error: (err) => {
        console.error('Error backend:', err);
        this.error = err.error?.message || 'Error al enviar la solicitud.';
      }
    });
  }
}
