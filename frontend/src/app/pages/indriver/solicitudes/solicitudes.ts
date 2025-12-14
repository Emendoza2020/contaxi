import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Map } from '../../../services/map';
import { Trip } from '../../../services/trip';
import { GoogleMapsModule } from '@angular/google-maps';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-solicitudes',
  standalone: true,
  imports: [GoogleMapsModule, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './solicitudes.html',
  styleUrl: './solicitudes.css'
})
export class Solicitudes {

  form!: FormGroup;

  map!: google.maps.Map;
  polyline?: google.maps.Polyline;
  markerOrigin?: google.maps.Marker;
  markerDest?: google.maps.Marker;
  estimatedFare: number | null = null;
  isLoadingRoute = false;

  @ViewChild('mapContainer', { static: true }) mapElement!: any;

  constructor(private fb: FormBuilder, private routing: Map, private tripService: Trip) {
    this.form = this.fb.group({
      origin: ['', Validators.required],
      destination: ['', Validators.required],
      passengers: [1, [Validators.required, Validators.min(1)]],
      priceOffer: [null]
    });
  }

  ngOnInit() {
    // Inicializar mapa
    const mapOptions: google.maps.MapOptions = {
      center: { lat: -16.5, lng: -68.2 }, // ejemplo: La Paz/El Alto
      zoom: 12
    };
    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, mapOptions);
  }

  async findRoute() {
    if (this.form.invalid) return;
    const origin = this.form.value.origin;
    const destination = this.form.value.destination;
    this.isLoadingRoute = true;
    try {
      const result = await this.routing.getRoute(origin, destination);
      this.renderRoute(result);
      // estimación simple de tarifa usando distancia en metros
      const leg = result.routes[0].legs[0];
      const distanceMeters = leg.distance.value;
      this.estimatedFare = this.calculateFare(distanceMeters);
      this.form.patchValue({ priceOffer: this.estimatedFare });
    } catch (err) {
      console.error(err);
      alert('Error obteniendo ruta: ' + err);
    } finally {
      this.isLoadingRoute = false;
    }
  }

  renderRoute(directionsResult: any) {
    // limpiar polyline previa
    if (this.polyline) {
      this.polyline.setMap(null);
      this.polyline = undefined;
    }
    // crear polyline desde overview_path
    const path = this.routing.getPolylinePoints(directionsResult);
    if (path.length === 0) return;
    this.polyline = new google.maps.Polyline({
      path,
      strokeOpacity: 0.9,
      strokeWeight: 5,
      map: this.map
    });

    // ajustar bounds
    const bounds = new google.maps.LatLngBounds();
    path.forEach(p => bounds.extend(new google.maps.LatLng(p.lat, p.lng)));
    this.map.fitBounds(bounds);

    // markers en inicio y fin
    const leg = directionsResult.routes[0].legs[0];
    const startLoc = leg.start_location;
    const endLoc = leg.end_location;
    if (this.markerOrigin) this.markerOrigin.setMap(null);
    if (this.markerDest) this.markerDest.setMap(null);
    this.markerOrigin = new google.maps.Marker({ position: startLoc, map: this.map, title: 'Origen' });
    this.markerDest = new google.maps.Marker({ position: endLoc, map: this.map, title: 'Destino' });
  }

  calculateFare(distanceMeters: number): number {
    // Ejemplo simple: tarifa base + por km
    const base = 8.0; // BOB
    const perKm = 2.0; // BOB por km
    const km = distanceMeters / 1000;
    const fare = base + perKm * km;
    return Math.round(fare * 100) / 100;
  }

  submitRequest() {
    if (this.form.invalid) return;
    const payload = {
      origin: this.form.value.origin,
      destination: this.form.value.destination,
      passengers: this.form.value.passengers,
      priceOffer: this.form.value.priceOffer
    };
    this.tripService.requestRide(payload).subscribe({
      next: res => {
        alert('Solicitud enviada: ' + JSON.stringify(res));
      },
      error: err => {
        console.error(err);
        alert('Error enviando solicitud');
      }
    });
  }

}
