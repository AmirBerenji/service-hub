import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// ─── Types ────────────────────────────────────────────────────────────────────

export type MarkerColor = 'blue' | 'red' | 'green';

export interface MapLocation {
  id: string | number;
  name: string;
  lat: number;
  lng: number;
  description?: string;
  color?: MarkerColor;
}

export interface SelectedLocation {
  lat: number;
  lng: number;
  address: string;
}

interface MapViewLocationProps {
  locations?: MapLocation[];
  height?: string;
  zoom?: number;
  center?: [number, number];
  onLocationSelect?: (location: SelectedLocation) => void; // 👈 callback
}

// ─── Icon map ─────────────────────────────────────────────────────────────────

const ICONS: Record<MarkerColor, L.Icon> = {
  blue: new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41],
  }),
  red: new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41],
  }),
  green: new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41],
  }),
};

const getIcon = (color: MarkerColor = 'blue') => ICONS[color];

// Selected pin icon (orange/gold to stand out)
const selectedIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41],
});

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

// ─── Click handler + reverse geocode ─────────────────────────────────────────

interface ClickHandlerProps {
  onLocationSelect?: (loc: SelectedLocation) => void;
  setPin: (pos: [number, number] | null) => void;
  setLoading: (v: boolean) => void;
  setSelected: (loc: SelectedLocation | null) => void;
}

function ClickHandler({ onLocationSelect, setPin, setLoading, setSelected }: ClickHandlerProps) {
  useMapEvents({
    async click(e) {
      const { lat, lng } = e.latlng;
      setPin([lat, lng]);
      setSelected(null);
      setLoading(true);

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
          { headers: { 'Accept-Language': 'en' } }
        );
        const data = await res.json();
        const location: SelectedLocation = {
          lat: parseFloat(data.lat),
          lng: parseFloat(data.lon),
          address: data.display_name ?? `${lat.toFixed(5)}, ${lng.toFixed(5)}`,
        };
        setSelected(location);
        onLocationSelect?.(location);
      } catch {
        const location: SelectedLocation = {
          lat, lng,
          address: `${lat.toFixed(5)}, ${lng.toFixed(5)}`,
        };
        setSelected(location);
        onLocationSelect?.(location);
      } finally {
        setLoading(false);
      }
    },
  });
  return null;
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function MapViewLocation({
  locations = [],
  height = '480px',
  zoom = 5,
  center,
  onLocationSelect,
}: MapViewLocationProps) {
  const [pin, setPin] = useState<[number, number] | null>(null);
  const [selected, setSelected] = useState<SelectedLocation | null>(null);
  const [loading, setLoading] = useState(false);

  const defaultCenter: [number, number] =
    center ?? (locations[0] ? [locations[0].lat, locations[0].lng] : [40.1792, 44.4991]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

      {/* Info panel */}
      <div style={{
        padding: '12px 16px',
        borderRadius: '10px',
        background: '#f8f9fa',
        border: '1px solid #e0e0e0',
        fontSize: '14px',
        minHeight: '56px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}>
        {loading && <span style={{ color: '#888' }}>⏳ Fetching address...</span>}

        {!loading && !selected && (
          <span style={{ color: '#aaa' }}>🗺️ Click anywhere on the map to select a location</span>
        )}

        {!loading && selected && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '100%' }}>
            <span style={{ fontWeight: 600, color: '#333' }}>📍 {selected.address}</span>
            <span style={{ color: '#888', fontFamily: 'monospace', fontSize: '12px' }}>
              lat: {selected.lat.toFixed(6)} &nbsp;|&nbsp; lng: {selected.lng.toFixed(6)}
            </span>
          </div>
        )}
      </div>

      {/* Map */}
      <MapContainer
        center={defaultCenter}
        zoom={zoom}
        style={{ height, width: '100%', borderRadius: '12px' }}
        scrollWheelZoom
      >
       <TileLayer
  url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
/>

        {locations.length > 0 && <FitBounds locations={locations} />}

        <ClickHandler
          onLocationSelect={onLocationSelect}
          setPin={setPin}
          setLoading={setLoading}
          setSelected={setSelected}
        />

        {/* Predefined markers */}
        {locations.map((loc) => (
          <Marker key={loc.id} position={[loc.lat, loc.lng]} icon={getIcon(loc.color)}>
            <Popup>
              <strong>{loc.name}</strong>
              {loc.description && <p style={{ margin: '4px 0 0' }}>{loc.description}</p>}
              <small style={{ color: '#888' }}>{loc.lat}, {loc.lng}</small>
            </Popup>
          </Marker>
        ))}

        {/* User-selected pin */}
        {pin && (
          <Marker position={pin} icon={selectedIcon}>
            <Popup>
              {loading
                ? 'Fetching address...'
                : selected?.address ?? 'Unknown location'}
              <br />
              <small style={{ color: '#888' }}>
                {pin[0].toFixed(6)}, {pin[1].toFixed(6)}
              </small>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}