import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Webpack/Vite default icon resolution issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// ─── Types ────────────────────────────────────────────────────────────────────

export interface MapLocation {
  id: string | number;
  name: string;
  lat: number;
  lng: number;
  description?: string;   // optional popup body text
}

interface MapViewProps {
  locations: MapLocation[];
  height?: string;          // default '480px'
  zoom?: number;            // default 5
  center?: [number, number]; // default = first location
}

// ─── Internal helper: auto-fit bounds when locations change ───────────────────

function FitBounds({ locations }: { locations: MapLocation[] }) {
  const map = useMap();

  useEffect(() => {
    if (!locations.length) return;
    const bounds = L.latLngBounds(locations.map((l) => [l.lat, l.lng]));
    map.fitBounds(bounds, { padding: [48, 48] });
  }, [locations, map]);

  return null;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function MapView({
  locations,
  height = '480px',
  zoom = 5,
  center,
}: MapViewProps) {
  const defaultCenter: [number, number] =
    center ?? (locations[0] ? [locations[0].lat, locations[0].lng] : [20, 0]);

  return (
    <MapContainer
      center={defaultCenter}
      zoom={zoom}
      style={{ height, width: '100%', borderRadius: '12px' }}
      scrollWheelZoom={true}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />

      {/* Auto-fit map to all markers */}
      <FitBounds locations={locations} />

      {locations.map((loc) => (
        <Marker key={loc.id} position={[loc.lat, loc.lng]}>
          <Popup>
            <strong>{loc.name}</strong>
            {loc.description && <p style={{ margin: '4px 0 0' }}>{loc.description}</p>}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}