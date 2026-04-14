"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { getMockDevices, Device } from "@/lib/mock-data";
import { FilterControls } from "@/components/filter-controls";
import { AnalyticsPanel } from "@/components/analytics-panel";
import { DeviceDetailModal } from "@/components/device-detail-modal";
import { Button } from "@/components/ui/button";
import { Shield, MapPin, BarChart3 } from "lucide-react";

const IotMap = dynamic(
  () => import("@/components/iot-map").then((mod) => mod.IotMap),
  { ssr: false },
);

export default function Dashboard() {
  const [allDevices, setAllDevices] = useState<Device[]>([]);
  const [filteredDevices, setFilteredDevices] = useState<Device[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [showAnalytics, setShowAnalytics] = useState(true);

  useEffect(() => {
    const devices = getMockDevices();
    setAllDevices(devices);
    setFilteredDevices(devices);
  }, []);

  const handleFilterChange = (filtered: Device[]) => {
    setFilteredDevices(filtered);
  };

  const handleMapSelect = (device: Device) => {
    setSelectedDevice(device);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-red-600 flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-red-600">
              Bantay Bayan - Lemery, Batangas
            </h1>
          </div>
          <p className="text-gray-600 text-sm">
            Real-time monitoring and vulnerability assessment for Lemery,
            Batangas
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar - Filters and Analytics */}
          <div className="lg:col-span-1 space-y-6">
            {/* Toggle Analytics */}
            <div className="flex gap-2">
              <Button
                variant={showAnalytics ? "default" : "outline"}
                size="sm"
                onClick={() => setShowAnalytics(true)}
                className="flex-1 text-xs"
              >
                <BarChart3 className="w-4 h-4 mr-1" />
                Analytics
              </Button>
              <Button
                variant={!showAnalytics ? "default" : "outline"}
                size="sm"
                onClick={() => setShowAnalytics(false)}
                className="flex-1 text-xs"
              >
                <MapPin className="w-4 h-4 mr-1" />
                Filters
              </Button>
            </div>

            {/* Content Area */}
            {showAnalytics ? (
              <AnalyticsPanel
                devices={allDevices}
                filteredDevices={filteredDevices}
              />
            ) : (
              <FilterControls
                devices={allDevices}
                onFilterChange={handleFilterChange}
              />
            )}
          </div>

          {/* Right Content - Map */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
              <IotMap
                devices={filteredDevices}
                selectedDevice={selectedDevice}
                onDeviceSelect={handleMapSelect}
                highlightedId={selectedDevice?.id ?? null}
              />
            </div>

            {/* Map Legend */}
            <div className="mt-4 bg-white p-4 rounded-lg border border-gray-200 shadow">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Legend
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-red-600"></div>
                  <span className="text-xs text-gray-700">High Risk</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-amber-500"></div>
                  <span className="text-xs text-gray-700">Medium Risk</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-green-600"></div>
                  <span className="text-xs text-gray-700">Low Risk</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                Click any marker to view detailed person information
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Device Detail Modal */}
      <DeviceDetailModal
        device={selectedDevice}
        onClose={() => setSelectedDevice(null)}
      />

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-600 text-sm">
          <p>
            IoT Location Monitoring System • Prototype Version • Lemery,
            Batangas
          </p>
        </div>
      </footer>
    </div>
  );
}
