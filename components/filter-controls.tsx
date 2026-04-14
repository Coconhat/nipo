'use client';

import { useState } from 'react';
import { Device } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface FilterControlsProps {
  devices: Device[];
  onFilterChange: (filtered: Device[]) => void;
}

export function FilterControls({ devices, onFilterChange }: FilterControlsProps) {
  const [riskFilter, setRiskFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [zoneFilter, setZoneFilter] = useState<string>('all');

  const applyFilters = (risk: string, status: string, zone: string) => {
    let filtered = devices;

    if (risk !== 'all') {
      filtered = filtered.filter((d) => d.riskLevel === risk);
    }

    if (status !== 'all') {
      filtered = filtered.filter((d) => d.status === status);
    }

    if (zone !== 'all') {
      filtered = filtered.filter((d) => d.zone === zone);
    }

    onFilterChange(filtered);
  };

  const handleRiskChange = (value: string) => {
    setRiskFilter(value);
    applyFilters(value, statusFilter, zoneFilter);
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    applyFilters(riskFilter, value, zoneFilter);
  };

  const handleZoneChange = (value: string) => {
    setZoneFilter(value);
    applyFilters(riskFilter, statusFilter, value);
  };

  const handleReset = () => {
    setRiskFilter('all');
    setStatusFilter('all');
    setZoneFilter('all');
    onFilterChange(devices);
  };

  const uniqueZones = Array.from(new Set(devices.map((d) => d.zone))).sort();

  return (
    <Card className="p-4 bg-white border-gray-200">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">
        Filters
      </h3>

      <div className="space-y-4">
        {/* Risk Level Filter */}
        <div>
          <label className="text-xs font-medium text-gray-700 block mb-2">
            Risk Level
          </label>
          <div className="flex gap-2 flex-wrap">
            {['all', 'high', 'medium', 'low'].map((level) => (
              <Button
                key={level}
                variant={riskFilter === level ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleRiskChange(level)}
                className={
                  level === 'high'
                    ? 'bg-red-600 hover:bg-red-700 text-white border-0'
                    : level === 'medium'
                      ? 'bg-amber-500 hover:bg-amber-600 text-white border-0'
                      : level === 'low'
                        ? 'bg-green-600 hover:bg-green-700 text-white border-0'
                        : ''
                }
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Status Filter */}
        <div>
          <label className="text-xs font-medium text-gray-700 block mb-2">
            Status
          </label>
          <div className="flex gap-2 flex-wrap">
            {['all', 'active', 'warning', 'inactive'].map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleStatusChange(status)}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Zone Filter */}
        <div>
          <label className="text-xs font-medium text-gray-700 block mb-2">
            Zone
          </label>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={zoneFilter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleZoneChange('all')}
            >
              All Zones
            </Button>
            {uniqueZones.map((zone) => (
              <Button
                key={zone}
                variant={zoneFilter === zone ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleZoneChange(zone)}
              >
                {zone.split(' - ')[1]}
              </Button>
            ))}
          </div>
        </div>

        {/* Reset Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleReset}
          className="w-full mt-4"
        >
          Clear All Filters
        </Button>
      </div>
    </Card>
  );
}
