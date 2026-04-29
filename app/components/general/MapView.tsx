import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// ─── Types ────────────────────────────────────────────────────────────────────

export type MarkerColor = 'blue' | 'red' | 'green'|'gold'|'orange';  // extend as needed

export interface MapLocation {
  id: string | number;
  name: string;
  lat: number;
  lng: number;
  description?: string;
  color?: MarkerColor;   // 👈 assign a color per marker
}

interface MapViewProps {
  locations: MapLocation[];
  height?: string;
  zoom?: number;
  center?: [number, number];
}

// ─── Icon map ─────────────────────────────────────────────────────────────────

const ICONS: Record<MarkerColor, L.Icon> = {
  blue: new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  }),
  red: new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  }),
  green: new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  }),
    gold: new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  }),
    orange: new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  }),
};

const getIcon = (color: MarkerColor = 'blue') => ICONS[color];

// ─── FitBounds ────────────────────────────────────────────────────────────────

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

export default function MapView({ locations, height = '480px', zoom = 5, center }: MapViewProps) {
  const defaultCenter: [number, number] =
    center ?? (locations[0] ? [locations[0].lat, locations[0].lng] : [20, 0]);

  return (
    <MapContainer center={defaultCenter} zoom={zoom} style={{ height, width: '100%', borderRadius: '12px' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      <FitBounds locations={locations} />

      {locations.map((loc) => (
        <Marker key={loc.id} position={[loc.lat, loc.lng]} icon={getIcon(loc.color)}>  {/* 👈 */}
          <Popup>
            <img
              src={`https://images.pexels.com/photos/6195118/pexels-photo-6195118.jpeg?_gl=1*145b3hg*_ga*OTQ0MjU0MTM5LjE3NzY3Njg0ODQ.*_ga_8JE65Q40S6*czE3NzY3Njg0ODMkbzEkZzEkdDE3NzY3Njg1MTQkajI5JGwwJGgw`}
              alt={loc.name}
              style={{ borderRadius: '50%', marginBottom: '8px' }}
            />
            <strong>{loc.name}</strong>
            {loc.description && <p style={{ margin: '4px 0 0' }}>{loc.description}</p>}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}