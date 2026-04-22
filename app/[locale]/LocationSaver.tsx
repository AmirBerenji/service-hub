'use client';

import { useEffect } from 'react';

export default function LocationSaver() {
  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const data = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        localStorage.setItem('user_location', JSON.stringify(data));
      },
      (error) => {
        console.error('Location error:', error.message);
      }
    );
  }, []);

  return null; // no UI needed
}