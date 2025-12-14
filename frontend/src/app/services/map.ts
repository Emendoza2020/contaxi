import { Injectable } from '@angular/core';
declare const google: any;
@Injectable({
  providedIn: 'root'
})
export class Map {
  private directionsService: any;
  constructor() {
    // directionsService se inicializa cuando google maps está disponible
    if (typeof google !== 'undefined') {
      this.directionsService = new google.maps.DirectionsService();
    }
  }

  ensureDirectionsService() {
    if (!this.directionsService && typeof google !== 'undefined') {
      this.directionsService = new google.maps.DirectionsService();
    }
  }

  getRoute(origin: string | { lat: number, lng: number }, destination: string | { lat: number, lng: number }) {
    this.ensureDirectionsService();
    return new Promise<any>((resolve, reject) => {
      if (!this.directionsService) {
        return reject('Google DirectionsService no disponible');
      }
      const request = {
        origin,
        destination,
        travelMode: google.maps.TravelMode.DRIVING,
        drivingOptions: { departureTime: new Date() }
      };
      this.directionsService.route(request, (result: any, status: any) => {
        if (status === 'OK') resolve(result);
        else reject(status);
      });
    });
  }

  // extra: extraer polyline path (array de LatLng) desde result
  getPolylinePoints(directionsResult: any): Array<{ lat: number, lng: number }> {
    const route = directionsResult.routes?.[0];
    if (!route) return [];
    const overviewPolyline = route.overview_polyline?.points;
    if (!overviewPolyline) return [];
    // decode polyline using google.maps.geometry.encoding if disponible
    if (typeof google !== 'undefined' && google.maps && google.maps.geometry && google.maps.geometry.encoding) {
      const decoded = google.maps.geometry.encoding.decodePath(overviewPolyline);
      return decoded.map((latLng: any) => ({ lat: latLng.lat(), lng: latLng.lng() }));
    }
    return [];
  }

}
