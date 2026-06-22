"use client";

import { addBusiness } from "@/action/businessApiAction";
import { getallCategory } from "@/action/categoryApiAction";
import AddressAutocomplete from "@/app/components/general/AddressAutocomplete";
import type { SelectedLocation } from "@/app/components/general/MapViewLocation";
import { Category, Service } from "@/model/service";
import {
  CalendarCheck,
  Camera,
  Car,
  Check,
  ChevronDown,
  ImagePlus,
  Laptop,
  Palette,
  Send,
  Sparkles,
  SprayCan,
  Truck,
  UploadCloud,
  Wrench,
  X,
  Zap,
} from "lucide-react";
import dynamic from "next/dynamic";
import React, { useEffect, useMemo, useRef, useState } from "react";

const MapViewLocation = dynamic(
  () => import("@/app/components/general/MapViewLocation"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-60 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-500">
        Loading map...
      </div>
    ),
  },
);

type ServiceCategory = {
  id: number;
  name: string;
  description: string;
  items: Service[];
  icon: React.ElementType;
  activeClass: string;
  chipClass: string;
};

type ServiceTypePrice = {
  min: string;
  max: string;
};

type UploadedPreview = {
  id: string;
  file: File;
  previewUrl: string;
};

const categoryStyles = [
  {
    activeClass: "border-rose-400 bg-rose-50 text-rose-700",
    chipClass: "bg-rose-100 text-rose-700",
  },
  {
    activeClass: "border-teal-500 bg-teal-50 text-teal-700",
    chipClass: "bg-teal-100 text-teal-700",
  },
  {
    activeClass: "border-orange-500 bg-orange-50 text-orange-700",
    chipClass: "bg-orange-100 text-orange-700",
  },
  {
    activeClass: "border-fuchsia-500 bg-fuchsia-50 text-fuchsia-700",
    chipClass: "bg-fuchsia-100 text-fuchsia-700",
  },
  {
    activeClass: "border-cyan-500 bg-cyan-50 text-cyan-700",
    chipClass: "bg-cyan-100 text-cyan-700",
  },
  {
    activeClass: "border-amber-500 bg-amber-50 text-amber-700",
    chipClass: "bg-amber-100 text-amber-700",
  },
  {
    activeClass: "border-indigo-500 bg-indigo-50 text-indigo-700",
    chipClass: "bg-indigo-100 text-indigo-700",
  },
  {
    activeClass: "border-sky-500 bg-sky-50 text-sky-700",
    chipClass: "bg-sky-100 text-sky-700",
  },
  {
    activeClass: "border-violet-500 bg-violet-50 text-violet-700",
    chipClass: "bg-violet-100 text-violet-700",
  },
  {
    activeClass: "border-emerald-500 bg-emerald-50 text-emerald-700",
    chipClass: "bg-emerald-100 text-emerald-700",
  },
];

const iconMap: Record<string, React.ElementType> = {
  beauty: Sparkles,
  sparkles: Sparkles,
  cleaning: SprayCan,
  spraycan: SprayCan,
  "spray-can": SprayCan,
  car: Car,
  "car-service": Car,
  "graphic-design": Palette,
  design: Palette,
  palette: Palette,
  plumbing: Wrench,
  wrench: Wrench,
  electrical: Zap,
  electric: Zap,
  zap: Zap,
  moving: Truck,
  truck: Truck,
  "it-support": Laptop,
  it: Laptop,
  laptop: Laptop,
  photography: Camera,
  camera: Camera,
  "event-planning": CalendarCheck,
  event: CalendarCheck,
  calendar: CalendarCheck,
};

function slugify(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, "-");
}

function getCategoryIcon(category: Category) {
  const iconKey = slugify(category.icon || category.name);
  return iconMap[iconKey] ?? Sparkles;
}

function toServiceCategory(category: Category, index: number): ServiceCategory {
  const style = categoryStyles[index % categoryStyles.length];

  return {
    id: category.id,
    name: category.name,
    description: category.description,
    items: category.services,
    icon: getCategoryIcon(category),
    activeClass: category.activeClass || style.activeClass,
    chipClass: category.chipClass || style.chipClass,
  };
}

export default function ProfilePage() {
  const [companyName, setCompanyName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState<SelectedLocation | null>(null);
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(
    null,
  );
  const [isServiceMenuOpen, setIsServiceMenuOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [prices, setPrices] = useState<Record<number, ServiceTypePrice>>({});
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState<UploadedPreview | null>(null);
  const [servicePhotos, setServicePhotos] = useState<
    Record<string, UploadedPreview[]>
  >({});
  const logoRef = useRef<UploadedPreview | null>(null);
  const servicePhotosRef = useRef<Record<string, UploadedPreview[]>>({});
  const [category, setCategory] = useState<Category[]>([]);
  const [isCategoryLoading, setIsCategoryLoading] = useState(true);
  const [categoryError, setCategoryError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState<boolean | null>(null);

  const serviceCategories = useMemo(
    () => category.map(toServiceCategory),
    [category],
  );

  const selectedService = useMemo(
    () =>
      serviceCategories.find((service) => service.id === selectedServiceId) ??
      serviceCategories[0] ??
      null,
    [selectedServiceId, serviceCategories],
  );
  const SelectedServiceIcon = selectedService?.icon ?? Sparkles;
  const selectedServicePhotos = selectedService
    ? (servicePhotos[selectedService.id] ?? [])
    : [];
  const selectedServiceItems = useMemo(
    () =>
      selectedService?.items.filter((item) => selectedItems.includes(item.id)) ??
      [],
    [selectedItems, selectedService],
  );

  useEffect(() => {
    const fetchCategories = async () => {
      setIsCategoryLoading(true);
      setCategoryError("");

      try {
        const categories = await getallCategory();
        const firstCategory = categories[0];
        const firstService = firstCategory?.services[0];

        setCategory(categories);
        setSelectedServiceId(firstCategory?.id ?? null);
        setSelectedItems(firstService ? [firstService.id] : []);
        setPrices(firstService ? { [firstService.id]: { min: "", max: "" } } : {});
      } catch (error) {
        console.error("Category retrieval failed:", error);
        setCategoryError("Unable to load service categories.");
      } finally {
        setIsCategoryLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    logoRef.current = logo;
  }, [logo]);

  useEffect(() => {
    servicePhotosRef.current = servicePhotos;
  }, [servicePhotos]);

  useEffect(() => {
    return () => {
      if (logoRef.current) {
        URL.revokeObjectURL(logoRef.current.previewUrl);
      }

      Object.values(servicePhotosRef.current).forEach((photos) => {
        photos.forEach((photo) => URL.revokeObjectURL(photo.previewUrl));
      });
    };
  }, []);

  function createImagePreview(file: File): UploadedPreview {
    return {
      id: `${file.name}-${file.lastModified}-${crypto.randomUUID()}`,
      file,
      previewUrl: URL.createObjectURL(file),
    };
  }

  function handleServiceChange(service: ServiceCategory) {
    const firstItem = service.items[0];

    setSelectedServiceId(service.id);
    setIsServiceMenuOpen(false);
    setSelectedItems(firstItem ? [firstItem.id] : []);
    setPrices(firstItem ? { [firstItem.id]: { min: "", max: "" } } : {});
  }

  function handleServiceTypeToggle(item: Service) {
    setSelectedItems((currentItems) => {
      if (currentItems.includes(item.id)) {
        setPrices((currentPrices) => {
          const nextPrices = { ...currentPrices };
          delete nextPrices[item.id];
          return nextPrices;
        });

        return currentItems.filter((currentItem) => currentItem !== item.id);
      }

      setPrices((currentPrices) => ({
        ...currentPrices,
        [item.id]: currentPrices[item.id] ?? { min: "", max: "" },
      }));

      return [...currentItems, item.id];
    });
  }

  function handlePriceChange(
    itemId: number,
    field: keyof ServiceTypePrice,
    value: string,
  ) {
    setPrices((currentPrices) => ({
      ...currentPrices,
      [itemId]: {
        min: currentPrices[itemId]?.min ?? "",
        max: currentPrices[itemId]?.max ?? "",
        [field]: value,
      },
    }));
  }

  function handleLogoChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

    setLogo((currentLogo) => {
      if (currentLogo) {
        URL.revokeObjectURL(currentLogo.previewUrl);
      }

      return createImagePreview(file);
    });
  }

  function handleServicePhotosChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const files = Array.from(event.target.files ?? []);
    event.target.value = "";

    if (files.length === 0) return;
    if (!selectedService) return;

    setServicePhotos((currentPhotosByService) => {
      const currentPhotos = currentPhotosByService[selectedService.id] ?? [];
      const remainingSlots = Math.max(0, 3 - currentPhotos.length);
      const nextPhotos = files.slice(0, remainingSlots).map(createImagePreview);

      if (nextPhotos.length === 0) {
        return currentPhotosByService;
      }

      return {
        ...currentPhotosByService,
        [selectedService.id]: [...currentPhotos, ...nextPhotos],
      };
    });
  }

  function handleLogoRemove() {
    setLogo((currentLogo) => {
      if (currentLogo) {
        URL.revokeObjectURL(currentLogo.previewUrl);
      }

      return null;
    });
  }

  function handleServicePhotoRemove(photoId: string) {
    if (!selectedService) return;

    setServicePhotos((currentPhotosByService) => {
      const currentPhotos = currentPhotosByService[selectedService.id] ?? [];
      const photoToRemove = currentPhotos.find((photo) => photo.id === photoId);

      if (photoToRemove) {
        URL.revokeObjectURL(photoToRemove.previewUrl);
      }

      return {
        ...currentPhotosByService,
        [selectedService.id]: currentPhotos.filter(
          (photo) => photo.id !== photoId,
        ),
      };
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSubmitMessage("");
    setSubmitSuccess(null);

    if (!companyName || !phone || !email || !location) {
      setSubmitSuccess(false);
      setSubmitMessage("Please fill company name, phone, email, and address.");
      return;
    }

    if (selectedServiceItems.length === 0) {
      setSubmitSuccess(false);
      setSubmitMessage("Please select at least one service type.");
      return;
    }

    const formData = new FormData();
    formData.append("name", companyName);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("address", location.address);
    formData.append("lat", String(location.lat));
    formData.append("lng", String(location.lng));

    if (description) {
      formData.append("description", description);
    }

    if (logo) {
      formData.append("logo", logo.file);
    }

    selectedServicePhotos.forEach((photo) => {
      formData.append("images[]", photo.file);
    });

    selectedServiceItems.forEach((service, index) => {
      const price = prices[service.id];

      formData.append(`services[${index}][id]`, String(service.id));

      if (price?.min) {
        formData.append(`services[${index}][min_price]`, price.min);
      }

      if (price?.max) {
        formData.append(`services[${index}][max_price]`, price.max);
      }
    });

    setIsSubmitting(true);

    try {
      const result = await addBusiness(formData);
      setSubmitSuccess(result.success);
      setSubmitMessage(result.message);
    } catch (error) {
      console.error("Business submit failed:", error);
      setSubmitSuccess(false);
      setSubmitMessage("Unable to add business.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="px-3 py-5 text-slate-900 sm:px-4 sm:py-8 md:px-8">
      <section className="mx-auto w-full max-w-5xl">
        <div className="mb-6 sm:mb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Service request
          </p>
          <h1 className="mt-2 text-2xl font-bold sm:text-3xl md:text-4xl">
            Choose your service
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Add your company details, select a service, choose the type of work,
            and write the details professionals need before contacting you.
          </p>
        </div>
        {/* <div>
          {category.map((item) => (
            <div key={item.id}>
              <h3 className="text-lg font-semibold text-slate-900">
                {item.name}
              </h3>
              <p className="text-sm text-slate-600">{item.description}</p>
            </div>
          ))}
        </div> */}

        <form
          onSubmit={handleSubmit}
          className="grid gap-5 lg:grid-cols-[1fr_360px] lg:gap-6"
        >
          <div className="space-y-6">
            <div className="rounded-lg bg-white p-4 shadow-sm sm:p-5">
              <h2 className="text-lg font-semibold text-slate-900">
                Company details
              </h2>
              <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_300px]">
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

                  <div>
                    <label
                      htmlFor="company-email"
                      className="text-sm font-medium text-slate-700"
                    >
                      Email
                    </label>
                    <input
                      id="company-email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="info@example.com"
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

                <div className="min-w-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-50 p-2">
                  <MapViewLocation
                    height="clamp(200px, 55vw, 240px)"
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

            <div
              id="services"
              className="relative z-20 rounded-lg bg-white p-4 shadow-sm sm:p-5"
            >
              <label
                htmlFor="service-selector"
                className="text-base font-semibold text-slate-900"
              >
                Service category
              </label>
              <button
                id="service-selector"
                type="button"
                aria-haspopup="listbox"
                aria-expanded={isServiceMenuOpen}
                disabled={isCategoryLoading || serviceCategories.length === 0}
                onClick={() => setIsServiceMenuOpen((isOpen) => !isOpen)}
                className={`mt-4 flex w-full items-center gap-3 rounded-lg border-2 p-3 text-left shadow-sm transition hover:shadow-md disabled:cursor-not-allowed disabled:opacity-70 sm:p-4 ${
                  selectedService?.activeClass ??
                  "border-slate-200 bg-slate-50 text-slate-600"
                }`}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
                  <SelectedServiceIcon size={22} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-base font-semibold sm:text-lg">
                    {selectedService?.name ??
                      (isCategoryLoading
                        ? "Loading categories..."
                        : "No service categories")}
                  </span>
                  <span className="mt-1 line-clamp-2 block text-sm leading-5 text-slate-600">
                    {selectedService?.description ??
                      categoryError ??
                      "Service categories will appear here."}
                  </span>
                </span>
                <ChevronDown
                  size={20}
                  className={`shrink-0 transition ${isServiceMenuOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isServiceMenuOpen && (
                <div
                  role="listbox"
                  aria-labelledby="service-selector"
                  className="absolute left-4 right-4 top-full z-30 mt-2 max-h-80 overflow-y-auto rounded-lg border border-slate-200 bg-white p-2 shadow-xl sm:left-5 sm:right-5"
                >
                  {serviceCategories.map((service) => {
                    const Icon = service.icon;
                    const isActive = service.id === selectedServiceId;

                    return (
                      <button
                        key={service.id}
                        type="button"
                        role="option"
                        aria-selected={isActive}
                        onClick={() => handleServiceChange(service)}
                        className={`flex w-full items-start gap-3 rounded-lg border p-3 text-left transition hover:bg-slate-50 ${
                          isActive ? service.activeClass : "text-slate-800"
                        }`}
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
                          <Icon size={20} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block font-semibold">
                            {service.name}
                          </span>
                          <span className="mt-1 block text-sm leading-5 text-slate-600">
                            {service.description}
                          </span>
                        </span>
                        {isActive && (
                          <Check size={18} className="mt-1 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="rounded-lg bg-white p-4 shadow-sm sm:p-5">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    Logo and service photos
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Add your company logo and up to 3 photos for{" "}
                    {selectedService?.name ?? "the selected service"}.
                  </p>
                </div>
                <span className="text-sm font-semibold text-slate-500">
                  {selectedServicePhotos.length}/3 photos
                </span>
              </div>

              <div className="mt-5 grid gap-5 lg:grid-cols-[180px_1fr]">
                <div>
                  <p className="text-sm font-medium text-slate-700">
                    Company logo
                  </p>
                  <div className="mt-2">
                    {logo ? (
                      <div className="relative h-36 w-36 overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                        <div
                          aria-label={logo.file.name}
                          className="h-full w-full bg-cover bg-center"
                          style={{ backgroundImage: `url(${logo.previewUrl})` }}
                        />
                        <button
                          type="button"
                          aria-label="Remove logo"
                          onClick={handleLogoRemove}
                          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white text-slate-700 shadow-sm transition hover:bg-slate-100"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <label
                        htmlFor="company-logo"
                        className="flex h-36 w-36 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 text-center text-sm font-semibold text-slate-600 transition hover:border-slate-400 hover:bg-white"
                      >
                        <UploadCloud size={24} />
                        <span className="mt-2">Upload logo</span>
                      </label>
                    )}
                    <input
                      id="company-logo"
                      type="file"
                      accept="image/*"
                      onChange={handleLogoChange}
                      className="sr-only"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-slate-700">
                      {selectedService?.name ?? "Service"} photos
                    </p>
                    <label
                      htmlFor="service-photos"
                      className={`inline-flex min-h-10 cursor-pointer items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold transition ${
                        !selectedService || selectedServicePhotos.length >= 3
                          ? "pointer-events-none border-slate-200 bg-slate-100 text-slate-400"
                          : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      <ImagePlus size={17} />
                      Add photos
                    </label>
                    <input
                      id="service-photos"
                      type="file"
                      accept="image/*"
                      multiple
                      disabled={!selectedService || selectedServicePhotos.length >= 3}
                      onChange={handleServicePhotosChange}
                      className="sr-only"
                    />
                  </div>

                  <div className="mt-2 grid grid-cols-3 gap-2 sm:gap-3">
                    {Array.from({ length: 3 }).map((_, index) => {
                      const photo = selectedServicePhotos[index];

                      return photo ? (
                        <div
                          key={photo.id}
                          className="relative aspect-square overflow-hidden rounded-lg border border-slate-200 bg-slate-50"
                        >
                          <div
                            aria-label={photo.file.name}
                            className="h-full w-full bg-cover bg-center"
                            style={{
                              backgroundImage: `url(${photo.previewUrl})`,
                            }}
                          />
                          <button
                            type="button"
                            aria-label="Remove service photo"
                            onClick={() => handleServicePhotoRemove(photo.id)}
                            className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-lg bg-white text-slate-700 shadow-sm transition hover:bg-slate-100"
                          >
                            <X size={15} />
                          </button>
                        </div>
                      ) : (
                        <div
                          key={`empty-photo-${index}`}
                          className="flex aspect-square items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 text-slate-400"
                        >
                          <ImagePlus size={22} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-white p-4 shadow-sm sm:p-5">
              <label className="text-base font-semibold text-slate-900">
                What do you need? Select one or more.
              </label>
              <div className="mt-4 grid grid-cols-2 gap-2 min-[420px]:flex min-[420px]:flex-wrap sm:gap-3">
                {selectedService && selectedService.items.length > 0 ? (
                  selectedService.items.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleServiceTypeToggle(item)}
                      className={`min-h-10 rounded-full border px-3 py-2 text-sm font-medium transition sm:px-4 ${
                        selectedItems.includes(item.id)
                          ? selectedService.chipClass
                          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      {item.name}
                    </button>
                  ))
                ) : (
                  <p className="col-span-2 rounded-lg bg-slate-50 p-4 text-sm text-slate-500">
                    {isCategoryLoading
                      ? "Loading service types..."
                      : "No service types are available for this category."}
                  </p>
                )}
              </div>
            </div>

            <div className="rounded-lg bg-white p-4 shadow-sm sm:p-5">
              <label className="text-base font-semibold text-slate-900">
                Price range for each selected type
              </label>
              <p className="mt-1 text-sm text-slate-500">Optional</p>
              <div className="mt-4 space-y-4">
                {selectedServiceItems.length > 0 ? (
                  selectedServiceItems.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-lg border border-slate-100 p-3 sm:p-4"
                    >
                      <p className="font-semibold text-slate-900">
                        {item.name}
                      </p>
                      <div className="mt-3 grid gap-4 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor={`service-${item.id}-min-price`}
                            className="text-sm font-medium text-slate-700"
                          >
                            Minimum price
                          </label>
                          <input
                            id={`service-${item.id}-min-price`}
                            name={`service-${item.id}-min-price`}
                            type="number"
                            min="0"
                            value={prices[item.id]?.min ?? ""}
                            onChange={(event) =>
                              handlePriceChange(
                                item.id,
                                "min",
                                event.target.value,
                              )
                            }
                            placeholder="0"
                            className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-400 focus:bg-white"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor={`service-${item.id}-max-price`}
                            className="text-sm font-medium text-slate-700"
                          >
                            Maximum price
                          </label>
                          <input
                            id={`service-${item.id}-max-price`}
                            name={`service-${item.id}-max-price`}
                            type="number"
                            min="0"
                            value={prices[item.id]?.max ?? ""}
                            onChange={(event) =>
                              handlePriceChange(
                                item.id,
                                "max",
                                event.target.value,
                              )
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

            <div className="rounded-lg bg-white p-4 shadow-sm sm:p-5">
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

          <aside className="h-fit min-w-0 rounded-lg bg-white p-4 shadow-sm sm:p-5 lg:sticky lg:top-6">
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
                <p className="text-slate-500">Email</p>
                <p className="mt-1 font-semibold text-slate-900 break-words">
                  {email || "No email"}
                </p>
              </div>
              <div>
                <p className="text-slate-500">Address</p>
                <p className="mt-1 rounded-lg bg-slate-50 p-3 leading-6 text-slate-700 break-words [overflow-wrap:anywhere]">
                  {location?.address || "No address selected"}
                </p>
              </div>
              <div>
                <p className="text-slate-500">Selected service</p>
                <p className="mt-1 font-semibold text-slate-900">
                  {selectedService?.name ?? "No service selected"}
                </p>
              </div>
              <div>
                <p className="text-slate-500">Media</p>
                <div className="mt-2 space-y-2">
                  <p className="font-semibold text-slate-900">
                    Logo: {logo?.file.name || "No logo selected"}
                  </p>
                  <p className="font-semibold text-slate-900">
                    Photos: {selectedServicePhotos.length}/3 selected
                  </p>
                </div>
              </div>
              <div>
                <p className="text-slate-500">Service types</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedServiceItems.length > 0 ? (
                    selectedServiceItems.map((item) => (
                      <span
                        key={item.id}
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          selectedService?.chipClass ??
                          "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {item.name}
                      </span>
                    ))
                  ) : (
                    <p className="font-semibold text-slate-900">
                      No type selected
                    </p>
                  )}
                </div>
              </div>
              <div>
                <p className="text-slate-500">Prices</p>
                <div className="mt-2 space-y-2">
                  {selectedServiceItems.length > 0 ? (
                    selectedServiceItems.map((item) => {
                      const price = prices[item.id];

                      return (
                        <p
                          key={item.id}
                          className="font-semibold text-slate-900"
                        >
                          <span className="break-words">{item.name}</span>:{" "}
                          {price?.min || price?.max
                            ? `${price.min || "0"} - ${price.max || "Any"}`
                            : "No price selected"}
                        </p>
                      );
                    })
                  ) : (
                    <p className="font-semibold text-slate-900">
                      No price selected
                    </p>
                  )}
                </div>
              </div>
              <div>
                <p className="text-slate-500">Description</p>
                <p className="mt-1 min-h-20 rounded-lg bg-slate-50 p-3 leading-6 text-slate-700 break-words">
                  {description || "Your description will appear here."}
                </p>
              </div>
            </div>

            {submitMessage && (
              <p
                className={`mt-5 rounded-lg border p-3 text-sm font-semibold ${
                  submitSuccess
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : "border-rose-200 bg-rose-50 text-rose-700"
                }`}
              >
                {submitMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              <Send size={18} />
              {isSubmitting ? "Sending..." : "Send request"}
            </button>
          </aside>
        </form>
      </section>
    </div>
  );
}
