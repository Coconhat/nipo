'use client';

import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Device } from '@/lib/mock-data';

interface IotMapProps {
  devices: Device[];
  selectedDevice: Device | null;
  onDeviceSelect: (device: Device) => void;
  highlightedId: string | null;
}

export function IotMap({
  devices,
  selectedDevice,
  onDeviceSelect,
  highlightedId,
}: IotMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<string, L.CircleMarker>>(new Map());

  useEffect(() => {
    if (!mapRef.current) {
      // Initialize map
      const map = L.map('map').setView([13.9534, 120.8506], 14);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      mapRef.current = map;
    }

    // Clear existing markers
    markersRef.current.forEach((marker) => {
      mapRef.current?.removeLayer(marker);
    });
    markersRef.current.clear();

    // Add markers for each device
    devices.forEach((device) => {
      const getRiskColor = (risk: string) => {
        switch (risk) {
          case 'high':
            return '#dc2626'; // Red
          case 'medium':
            return '#f59e0b'; // Amber
          case 'low':
            return '#10b981'; // Green
          default:
            return '#6b7280'; // Gray
        }
      };

      const getStatusOpacity = (status: string) => {
        return status === 'inactive' ? 0.4 : 1;
      };

      const color = getRiskColor(device.riskLevel);
      const opacity = getStatusOpacity(device.status);

      const marker = L.circleMarker(
        [device.latitude, device.longitude],
        {
          radius: 8,
          fillColor: color,
          color: 'white',
          weight: 2,
          opacity: opacity,
          fillOpacity: 0.7,
          className: `device-marker device-${device.id}`,
        }
      );

      marker.bindPopup(
        `<div style="min-width: 180px;">
          <strong>${device.name}</strong><br/>
          <span>Age: ${device.age}</span><br/>
          <span>Status: ${device.status}</span><br/>
          <span>Risk: ${device.riskLevel} (${device.riskScore})</span><br/>
          <span>Zone: ${device.zone}</span>
        </div>`
      );

      marker.on('mouseover', () => {
        marker.openPopup();
      });

      marker.on('mouseout', () => {
        marker.closePopup();
      });

      marker.on('click', () => {
        onDeviceSelect(device);
      });

      marker.addTo(mapRef.current!);
      markersRef.current.set(device.id, marker);
    });
  }, [devices, onDeviceSelect]);

  // Highlight selected device
  useEffect(() => {
    markersRef.current.forEach((marker, id) => {
      if (id === highlightedId || id === selectedDevice?.id) {
        marker.setStyle({
          weight: 4,
          radius: 12,
        });
      } else {
        marker.setStyle({
          weight: 2,
          radius: 8,
        });
      }
    });
  }, [selectedDevice, highlightedId]);

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
      <div
        id="map"
        className="w-full h-full"
        style={{ minHeight: '600px' }}
      ></div>
    </div>
  );
}
