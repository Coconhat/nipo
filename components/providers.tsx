'use client';

import { useEffect } from 'react';

export function LeafletProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Load Leaflet CSS and JS dynamically
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup is optional - usually these libraries persist
    };
  }, []);

  return <>{children}</>;
}
