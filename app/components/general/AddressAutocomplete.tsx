import { useState, useEffect, useRef, useCallback } from "react";

interface NominatimResult {
  place_id: number;
  lat: string;
  lon: string;
  display_name: string;
  name?: string;
  type?: string;
  class?: string;
}

interface Location {
  lat: number;
  lng: number;
  address: string;
  raw: NominatimResult;
}

interface Props {
  onSelect?: (location: Location) => void;
  placeholder?: string;
}

const typeIcon = (type: string): string => {
  const map: Record<string, string> = {
    city: "🏙️", town: "🏘️", village: "🏡", road: "🛣️",
    house: "🏠", restaurant: "🍽️", hotel: "🏨", hospital: "🏥",
    school: "🏫", park: "🌳",
  };
  return map[type] || "📍";
};

export default function AddressAutocomplete({ onSelect, placeholder = "Start typing an address..." }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<NominatimResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [selected, setSelected] = useState<Location | null>(null);
  const [copied, setCopied] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const search = useCallback(async (q: string) => {
    if (q.trim().length < 3) { setResults([]); setOpen(false); return; }
    setLoading(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&addressdetails=1&limit=6`,
        { headers: { "Accept-Language": "en" } }
      );
      const data = await res.json() as NominatimResult[];
      setResults(data);
      setOpen(true);
      setActiveIdx(-1);
    } catch {
      setResults([]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (debounceRef.current !== null) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => search(query), 350);
    return () => {
      if (debounceRef.current !== null) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query, search]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!inputRef.current?.contains(e.target as Node) && !dropdownRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (item: NominatimResult) => {
    const location: Location = {
      lat: parseFloat(item.lat),
      lng: parseFloat(item.lon),
      address: item.display_name,
      raw: item,
    };
    setSelected(location);
    setQuery(item.display_name);
    setOpen(false);
    setResults([]);
    onSelect?.(location);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setActiveIdx((i) => Math.min(i + 1, results.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActiveIdx((i) => Math.max(i - 1, 0)); }
    else if (e.key === "Enter" && activeIdx >= 0) { e.preventDefault(); handleSelect(results[activeIdx]); }
    else if (e.key === "Escape") { setOpen(false); }
  };

  const handleCopy = () => {
    if (!selected) return;
    navigator.clipboard.writeText(`${selected.lat.toFixed(6)}, ${selected.lng.toFixed(6)}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleClear = () => {
    setQuery("");
    setSelected(null);
    setResults([]);
    setOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div className="w-full max-w-xl mx-auto font-sans">
      {/* Search field */}
      <div className="relative" ref={inputRef}>
        <label className="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-2">
          Search address
        </label>

        <div className="relative flex items-center">
          {/* Search icon */}
          <svg
            className="absolute left-3.5 w-4 h-4 text-gray-400 pointer-events-none"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => results.length > 0 && setOpen(true)}
            placeholder={placeholder}
            autoComplete="off"
            className="w-full pl-10 pr-10 py-3 text-sm bg-white border border-gray-200 rounded-xl shadow-sm
              text-gray-800 placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400
              transition-all duration-150"
          />

          {/* Spinner or clear button */}
          <div className="absolute right-3 flex items-center">
            {loading ? (
              <svg className="animate-spin w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            ) : query ? (
              <button onClick={handleClear} className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            ) : null}
          </div>
        </div>

        {/* Dropdown */}
        {open && (
          <div
            ref={dropdownRef}
            className="absolute z-50 w-full mt-1.5 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden"
          >
            {results.length === 0 ? (
              <div className="px-4 py-3 text-sm text-gray-400">No results found</div>
            ) : (
              results.map((item, i) => {
                const name = item.name || item.display_name.split(",")[0];
                const sub = item.display_name;
                const icon = typeIcon(item.type || item.class || "");
                return (
                  <button
                    key={item.place_id}
                    onMouseDown={() => handleSelect(item)}
                    onMouseEnter={() => setActiveIdx(i)}
                    className={`w-full text-left flex items-start gap-3 px-4 py-3 text-sm border-b border-gray-50 last:border-0 transition-colors duration-75
                      ${activeIdx === i ? "bg-blue-50" : "hover:bg-gray-50"}`}
                  >
                    <span className="text-base mt-0.5 shrink-0">{icon}</span>
                    <span className="flex-1 min-w-0">
                      <span className="block font-medium text-gray-800 truncate">{name}</span>
                      <span className="block text-xs text-gray-400 truncate mt-0.5">{sub}</span>
                    </span>
                  </button>
                );
              })
            )}
            <div className="px-4 py-2 border-t border-gray-50 flex items-center gap-1.5">
              <svg className="w-3 h-3 text-gray-300" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
              </svg>
              <span className="text-xs text-gray-300">Powered by OpenStreetMap · Free</span>
            </div>
          </div>
        )}
      </div>

      {/* Result card */}
      {selected && (
        <div className="mt-4 bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-50">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3">Selected location</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-xl px-4 py-3">
                <p className="text-xs text-gray-400 mb-1">Latitude</p>
                <p className="text-lg font-semibold text-gray-800 font-mono tabular-nums">
                  {selected.lat.toFixed(6)}
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl px-4 py-3">
                <p className="text-xs text-gray-400 mb-1">Longitude</p>
                <p className="text-lg font-semibold text-gray-800 font-mono tabular-nums">
                  {selected.lng.toFixed(6)}
                </p>
              </div>
            </div>
          </div>

          <div className="px-5 py-3 flex items-start justify-between gap-4">
            <p className="text-xs text-gray-500 leading-relaxed flex-1">{selected.address}</p>
            <button
              onClick={handleCopy}
              className={`shrink-0 flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-all duration-150
                ${copied
                  ? "bg-green-50 border-green-200 text-green-600"
                  : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
            >
              {copied ? (
                <>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Copied
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/*
USAGE EXAMPLE:
--------------
import AddressAutocomplete from "./AddressAutocomplete";

function App() {
  const handleSelect = ({ lat, lng, address }) => {
    console.log("Latitude:", lat);
    console.log("Longitude:", lng);
    console.log("Address:", address);
  };

  return (
    <div className="p-8">
      <AddressAutocomplete onSelect={handleSelect} />
    </div>
  );
}
*/