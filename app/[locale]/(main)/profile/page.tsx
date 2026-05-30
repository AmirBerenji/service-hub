"use client";

import AddressAutocomplete from "@/app/components/general/AddressAutocomplete";
import type { SelectedLocation } from "@/app/components/general/MapViewLocation";
import { Sparkles, SprayCan, Send } from "lucide-react";
import dynamic from "next/dynamic";
import React, { useMemo, useState } from "react";

const MapViewLocation = dynamic(
  () => import("@/app/components/general/MapViewLocation"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-60 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-500">
        Loading map...
      </div>
    ),
  }
);

type Service = {
  id: "beauty" | "cleaning";
  name: string;
  description: string;
  items: string[];
  icon: React.ElementType;
  activeClass: string;
  chipClass: string;
};

type ServiceTypePrice = {
  min: string;
  max: string;
};

const services: Service[] = [
  {
    id: "beauty",
    name: "Beauty",
    description: "Hair, nails, skincare, makeup, waxing, and grooming.",
    items: ["Hair styling", "Nails", "Skincare", "Makeup", "Waxing"],
    icon: Sparkles,
    activeClass: "border-rose-400 bg-rose-50 text-rose-700",
    chipClass: "bg-rose-100 text-rose-700",
  },
  {
    id: "cleaning",
    name: "Cleaning",
    description: "Home, office, deep cleaning, carpet, windows, and move-in help.",
    items: ["Home cleaning", "Office cleaning", "Deep cleaning", "Carpet", "Windows"],
    icon: SprayCan,
    activeClass: "border-teal-500 bg-teal-50 text-teal-700",
    chipClass: "bg-teal-100 text-teal-700",
  },
];

export default function ProfilePage() {
  const [companyName, setCompanyName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState<SelectedLocation | null>(null);
  const [selectedServiceId, setSelectedServiceId] = useState<Service["id"]>("beauty");
  const [selectedItems, setSelectedItems] = useState<string[]>([services[0].items[0]]);
  const [prices, setPrices] = useState<Record<string, ServiceTypePrice>>({
    [services[0].items[0]]: { min: "", max: "" },
  });
  const [description, setDescription] = useState("");

  const selectedService = useMemo(
    () => services.find((service) => service.id === selectedServiceId) ?? services[0],
    [selectedServiceId]
  );

  function handleServiceChange(service: Service) {
    setSelectedServiceId(service.id);
    setSelectedItems([service.items[0]]);
    setPrices({ [service.items[0]]: { min: "", max: "" } });
  }

  function handleServiceTypeToggle(item: string) {
    setSelectedItems((currentItems) => {
      if (currentItems.includes(item)) {
        setPrices((currentPrices) => {
          const nextPrices = { ...currentPrices };
          delete nextPrices[item];
          return nextPrices;
        });

        return currentItems.filter((currentItem) => currentItem !== item);
      }

      setPrices((currentPrices) => ({
        ...currentPrices,
        [item]: currentPrices[item] ?? { min: "", max: "" },
      }));

      return [...currentItems, item];
    });
  }

  function handlePriceChange(
    item: string,
    field: keyof ServiceTypePrice,
    value: string
  ) {
    setPrices((currentPrices) => ({
      ...currentPrices,
      [item]: {
        min: currentPrices[item]?.min ?? "",
        max: currentPrices[item]?.max ?? "",
        [field]: value,
      },
    }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    console.log({
      companyName,
      phone,
      location,
      service: selectedService.name,
      serviceTypes: selectedItems.map((item) => ({
        name: item,
        minPrice: prices[item]?.min || null,
        maxPrice: prices[item]?.max || null,
      })),
      description,
    });
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 md:px-10">
      <section className="mx-auto w-full max-w-5xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Service request
          </p>
          <h1 className="mt-2 text-3xl font-bold md:text-4xl">Choose your service</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Add your company details, select Beauty or Cleaning, choose the type of work,
            and write the details professionals need before contacting you.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <div className="rounded-lg bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">Company details</h2>
              <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_300px]">
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="company-name"
                      className="text-sm font-medium text-slate-700"
                    >
                      Company name
                    </label>
                    <input
                      id="company-name"
                      name="companyName"
                      type="text"
                      value={companyName}
                      onChange={(event) => setCompanyName(event.target.value)}
                      placeholder="Example: Bright Home Services"
                      className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-400 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="company-phone"
                      className="text-sm font-medium text-slate-700"
                    >
                      Phone
                    </label>
                    <input
                      id="company-phone"
                      name="phone"
                      type="tel"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      placeholder="+374 00 000 000"
                      className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-400 focus:bg-white"
                    />
                  </div>

                  <AddressAutocomplete
                    label="Company address"
                    placeholder="Search your company address..."
                    onSelect={({ lat, lng, address }) =>
                      setLocation({ lat, lng, address })
                    }
                    onClear={() => setLocation(null)}
                  />
                </div>

                <div className="overflow-hidden rounded-lg border border-slate-200 bg-slate-50 p-2">
                  <MapViewLocation
                    height="240px"
                    zoom={location ? 15 : 5}
                    selectedLocation={location}
                    locations={
                      location
                        ? [
                            {
                              id: "company-location",
                              name: companyName || "Company location",
                              lat: location.lat,
                              lng: location.lng,
                              description: location.address,
                              color: "gold",
                            },
                          ]
                        : []
                    }
                    onLocationSelect={setLocation}
                    showInfoPanel={false}
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {services.map((service) => {
                const Icon = service.icon;
                const isActive = service.id === selectedServiceId;

                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => handleServiceChange(service)}
                    className={`rounded-lg border-2 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                      isActive ? service.activeClass : "border-transparent text-slate-800"
                    }`}
                  >
                    <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm">
                      <Icon size={22} />
                    </span>
                    <span className="block text-xl font-semibold">{service.name}</span>
                    <span className="mt-2 block text-sm leading-6 text-slate-600">
                      {service.description}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="rounded-lg bg-white p-5 shadow-sm">
              <label className="text-base font-semibold text-slate-900">
                What do you need? Select one or more.
              </label>
              <div className="mt-4 flex flex-wrap gap-3">
                {selectedService.items.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => handleServiceTypeToggle(item)}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                      selectedItems.includes(item)
                        ? selectedService.chipClass
                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-lg bg-white p-5 shadow-sm">
              <label className="text-base font-semibold text-slate-900">
                Price range for each selected type
              </label>
              <p className="mt-1 text-sm text-slate-500">Optional</p>
              <div className="mt-4 space-y-4">
                {selectedItems.length > 0 ? (
                  selectedItems.map((item) => (
                    <div key={item} className="rounded-lg border border-slate-100 p-4">
                      <p className="font-semibold text-slate-900">{item}</p>
                      <div className="mt-3 grid gap-4 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor={`${item}-min-price`}
                            className="text-sm font-medium text-slate-700"
                          >
                            Minimum price
                          </label>
                          <input
                            id={`${item}-min-price`}
                            name={`${item}MinPrice`}
                            type="number"
                            min="0"
                            value={prices[item]?.min ?? ""}
                            onChange={(event) =>
                              handlePriceChange(item, "min", event.target.value)
                            }
                            placeholder="0"
                            className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-400 focus:bg-white"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor={`${item}-max-price`}
                            className="text-sm font-medium text-slate-700"
                          >
                            Maximum price
                          </label>
                          <input
                            id={`${item}-max-price`}
                            name={`${item}MaxPrice`}
                            type="number"
                            min="0"
                            value={prices[item]?.max ?? ""}
                            onChange={(event) =>
                              handlePriceChange(item, "max", event.target.value)
                            }
                            placeholder="500"
                            className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-400 focus:bg-white"
                          />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="rounded-lg bg-slate-50 p-4 text-sm text-slate-500">
                    Select a service type to add its price.
                  </p>
                )}
              </div>
            </div>

            <div className="rounded-lg bg-white p-5 shadow-sm">
              <label
                htmlFor="service-description"
                className="text-base font-semibold text-slate-900"
              >
                Description
              </label>
              <textarea
                id="service-description"
                name="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                rows={7}
                required
                placeholder="Example: I need deep cleaning for a 2 bedroom apartment this weekend. Please include kitchen and bathroom."
                className="mt-4 w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 outline-none transition focus:border-slate-400 focus:bg-white"
              />
            </div>
          </div>

          <aside className="h-fit rounded-lg bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold">Request summary</h2>
            <div className="mt-5 space-y-4 text-sm">
              <div>
                <p className="text-slate-500">Company</p>
                <p className="mt-1 font-semibold text-slate-900">
                  {companyName || "No company name"}
                </p>
              </div>
              <div>
                <p className="text-slate-500">Phone</p>
                <p className="mt-1 font-semibold text-slate-900">
                  {phone || "No phone"}
                </p>
              </div>
              <div>
                <p className="text-slate-500">Address</p>
                <p className="mt-1 rounded-lg bg-slate-50 p-3 leading-6 text-slate-700">
                  {location?.address || "No address selected"}
                </p>
              </div>
              <div>
                <p className="text-slate-500">Selected service</p>
                <p className="mt-1 font-semibold text-slate-900">{selectedService.name}</p>
              </div>
              <div>
                <p className="text-slate-500">Service types</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedItems.length > 0 ? (
                    selectedItems.map((item) => (
                      <span
                        key={item}
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${selectedService.chipClass}`}
                      >
                        {item}
                      </span>
                    ))
                  ) : (
                    <p className="font-semibold text-slate-900">No type selected</p>
                  )}
                </div>
              </div>
              <div>
                <p className="text-slate-500">Prices</p>
                <div className="mt-2 space-y-2">
                  {selectedItems.length > 0 ? (
                    selectedItems.map((item) => {
                      const price = prices[item];

                      return (
                        <p key={item} className="font-semibold text-slate-900">
                          {item}:{" "}
                          {price?.min || price?.max
                            ? `${price.min || "0"} - ${price.max || "Any"}`
                            : "No price selected"}
                        </p>
                      );
                    })
                  ) : (
                    <p className="font-semibold text-slate-900">No price selected</p>
                  )}
                </div>
              </div>
              <div>
                <p className="text-slate-500">Description</p>
                <p className="mt-1 min-h-20 rounded-lg bg-slate-50 p-3 leading-6 text-slate-700">
                  {description || "Your description will appear here."}
                </p>
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-700"
            >
              <Send size={18} />
              Send request
            </button>
          </aside>
        </form>
      </section>
    </main>
  );
}
