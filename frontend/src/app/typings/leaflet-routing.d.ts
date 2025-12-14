import * as L from 'leaflet';

declare module 'leaflet' {
  namespace Routing {
    interface Waypoint {
      latLng: L.LatLng;
      name?: string;
    }

    interface RouteSummary {
      totalDistance: number;
      totalTime: number;
    }

    interface Route {
      coordinates: L.LatLng[];
      summary: RouteSummary;
    }

    interface RoutesFoundEvent {
      routes: Route[];
    }

    interface ControlOptions extends L.ControlOptions {
      waypoints?: L.LatLng[];
      router?: any;
      lineOptions?: any;
      show?: boolean;
      addWaypoints?: boolean;
      draggableWaypoints?: boolean;
      fitSelectedRoutes?: boolean;
      createMarker?: (i: number, wp: Waypoint) => L.Marker;
    }

    class Control extends L.Control {
      constructor(options?: ControlOptions);
      on(type: 'routesfound', fn: (e: RoutesFoundEvent) => void): this;
    }

    function control(options?: ControlOptions): Control;
    function osrmv1(options?: { serviceUrl?: string }): any;
  }
}
