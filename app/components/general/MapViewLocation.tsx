"use client";

import { Loader2, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// ─── Types ────────────────────────────────────────────────────────────────────

export type MarkerColor = 'blue' | 'red' | 'green' | 'orange' | 'gold';

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

interface ReverseGeocodeResult {
  lat?: string;
  lon?: string;
  display_name?: string;
}

interface MapViewLocationProps {
  locations?: MapLocation[];
  height?: string;
  zoom?: number;
  center?: [number, number];
  selectedLocation?: SelectedLocation | null;
  onLocationSelect?: (location: SelectedLocation) => void;
  showInfoPanel?: boolean;
  className?: string;
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
  orange: new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41],
  }),
  gold: new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
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

function RecenterMap({
  location,
  zoom,
}: {
  location: SelectedLocation | null;
  zoom: number;
}) {
  const map = useMap();

  useEffect(() => {
    if (!location) return;
    map.flyTo([location.lat, location.lng], zoom, { duration: 0.6 });
  }, [location, map, zoom]);

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
        const data = await res.json() as ReverseGeocodeResult;
        const location: SelectedLocation = {
          lat: data.lat ? parseFloat(data.lat) : lat,
          lng: data.lon ? parseFloat(data.lon) : lng,
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
  selectedLocation,
  onLocationSelect,
  showInfoPanel = true,
  className = '',
}: MapViewLocationProps) {
  const [pin, setPin] = useState<[number, number] | null>(null);
  const [selected, setSelected] = useState<SelectedLocation | null>(null);
  const [loading, setLoading] = useState(false);

  const displayedSelected = selectedLocation ?? selected;
  const displayedPin: [number, number] | null = selectedLocation
    ? [selectedLocation.lat, selectedLocation.lng]
    : pin;

  const defaultCenter: [number, number] =
    center ??
    (selectedLocation
      ? [selectedLocation.lat, selectedLocation.lng]
      : locations[0]
        ? [locations[0].lat, locations[0].lng]
        : [40.1792, 44.4991]);

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {showInfoPanel && (
        <div className="flex min-h-14 items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm">
          {loading && (
            <span className="flex items-center gap-2 text-slate-500">
              <Loader2 className="animate-spin" size={16} />
              Fetching address...
            </span>
          )}

          {!loading && !displayedSelected && (
            <span className="flex items-center gap-2 text-slate-400">
              <MapPin size={16} />
              Click anywhere on the map to select a location
            </span>
          )}

          {!loading && displayedSelected && (
            <div className="flex w-full flex-col gap-1">
              <span className="flex items-start gap-2 font-semibold text-slate-800">
                <MapPin className="mt-0.5 shrink-0" size={16} />
                {displayedSelected.address}
              </span>
              <span className="font-mono text-xs text-slate-500">
                lat: {displayedSelected.lat.toFixed(6)} | lng: {displayedSelected.lng.toFixed(6)}
              </span>
            </div>
          )}
        </div>
      )}

      <MapContainer
        center={defaultCenter}
        zoom={zoom}
        style={{ height, width: '100%', borderRadius: '8px' }}
        scrollWheelZoom
      >
       <TileLayer
  url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
/>

        {locations.length > 0 && <FitBounds locations={locations} />}
        <RecenterMap location={displayedSelected} zoom={zoom} />

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
        {displayedPin && (
          <Marker position={displayedPin} icon={selectedIcon}>
            <Popup>
              {loading
                ? 'Fetching address...'
                : displayedSelected?.address ?? 'Unknown location'}
              <br />
              <small style={{ color: '#888' }}>
                {displayedPin[0].toFixed(6)}, {displayedPin[1].toFixed(6)}
              </small>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
