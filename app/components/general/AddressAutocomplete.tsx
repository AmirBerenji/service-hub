"use client";

import { Check, Copy, Loader2, MapPin, Search, X } from "lucide-react";
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

export interface AddressLocation {
  lat: number;
  lng: number;
  address: string;
  raw: NominatimResult;
}

interface Props {
  onSelect?: (location: AddressLocation) => void;
  onClear?: () => void;
  placeholder?: string;
  label?: string;
  className?: string;
}

export default function AddressAutocomplete({
  onSelect,
  onClear,
  placeholder = "Start typing an address...",
  label = "Search address",
  className = "",
}: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<NominatimResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [selected, setSelected] = useState<AddressLocation | null>(null);
  const [copied, setCopied] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const search = useCallback(async (q: string) => {
    if (q.trim().length < 3) {
      setResults([]);
      setOpen(false);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&addressdetails=1&limit=6`,
        { headers: { "Accept-Language": "en" } },
      );
      const data = (await res.json()) as NominatimResult[];
      setResults(data);
      setOpen(true);
      setActiveIdx(-1);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
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
      if (
        !containerRef.current?.contains(e.target as Node) &&
        !dropdownRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (item: NominatimResult) => {
    const location: AddressLocation = {
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

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && activeIdx >= 0) {
      e.preventDefault();
      handleSelect(results[activeIdx]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const handleCopy = async () => {
    if (!selected) return;

    try {
      await navigator.clipboard.writeText(
        `${selected.lat.toFixed(6)}, ${selected.lng.toFixed(6)}`,
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  const handleClear = () => {
    setQuery("");
    setSelected(null);
    setResults([]);
    setOpen(false);
    onClear?.();
    inputRef.current?.focus();
  };

  return (
    <div className={`w-full font-sans ${className}`}>
      <div className="relative" ref={containerRef}>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          {label}
        </label>

        <div className="relative flex items-center">
          <Search
            className="pointer-events-none absolute left-3.5 text-slate-400"
            size={17}
          />

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => results.length > 0 && setOpen(true)}
            placeholder={placeholder}
            autoComplete="off"
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-3 pl-10 pr-10 text-sm text-slate-800 shadow-sm outline-none transition focus:border-slate-400 focus:bg-white"
          />

          <div className="absolute right-3 flex items-center">
            {loading ? (
              <Loader2 className="animate-spin text-slate-400" size={16} />
            ) : query ? (
              <button
                type="button"
                onClick={handleClear}
                className="text-slate-400 transition hover:text-slate-600"
                aria-label="Clear address"
              >
                <X size={16} />
              </button>
            ) : null}
          </div>
        </div>

        {open && (
          <div
            ref={dropdownRef}
            className="absolute z-50 mt-1.5 w-full overflow-hidden rounded-lg border border-slate-100 bg-white shadow-lg"
          >
            {results.length === 0 ? (
              <div className="px-4 py-3 text-sm text-slate-400">
                No results found
              </div>
            ) : (
              results.map((item, i) => {
                const name = item.name || item.display_name.split(",")[0];
                const sub = item.display_name;
                return (
                  <button
                    key={item.place_id}
                    type="button"
                    onMouseDown={() => handleSelect(item)}
                    onMouseEnter={() => setActiveIdx(i)}
                    className={`flex w-full items-start gap-3 border-b border-slate-50 px-4 py-3 text-left text-sm transition last:border-0 ${
                      activeIdx === i ? "bg-amber-50" : "hover:bg-slate-50"
                    }`}
                  >
                    <MapPin
                      className="mt-0.5 shrink-0 text-slate-400"
                      size={17}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-medium text-slate-800">
                        {name}
                      </span>
                      <span className="mt-0.5 block truncate text-xs text-slate-400">
                        {sub}
                      </span>
                    </span>
                  </button>
                );
              })
            )}
            <div className="flex items-center gap-1.5 border-t border-slate-50 px-4 py-2">
              <MapPin className="text-slate-300" size={13} />
              <span className="text-xs text-slate-300">
                Powered by OpenStreetMap
              </span>
            </div>
          </div>
        )}
      </div>

      {selected && (
        <div className="mt-4 overflow-hidden rounded-lg border border-slate-100 bg-white shadow-sm">
          <div className="border-b border-slate-50 px-5 py-4 hidden">
            <p className="mb-3 text-xs font-medium uppercase tracking-widest text-slate-400">
              Selected location
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-slate-50 px-4 py-3">
                <p className="mb-1 text-xs text-slate-400">Latitude</p>
                <p className="font-mono text-sm font-semibold tabular-nums text-slate-800 sm:text-base">
                  {selected.lat.toFixed(6)}
                </p>
              </div>
              <div className="rounded-lg bg-slate-50 px-4 py-3">
                <p className="mb-1 text-xs text-slate-400">Longitude</p>
                <p className="font-mono text-sm font-semibold tabular-nums text-slate-800 sm:text-base">
                  {selected.lng.toFixed(6)}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-start justify-between gap-4 px-5 py-3 hidden">
            <p className="flex-1 text-xs leading-relaxed text-slate-500">
              {selected.address}
            </p>
            <button
              type="button"
              onClick={handleCopy}
              className={`flex shrink-0 items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs transition
                ${
                  copied
                    ? "border-green-200 bg-green-50 text-green-600"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
            >
              {copied ? (
                <>
                  <Check size={14} />
                  Copied
                </>
              ) : (
                <>
                  <Copy size={14} />
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
