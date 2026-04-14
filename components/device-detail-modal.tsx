'use client';

import { Device } from '@/lib/mock-data';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, AlertCircle, MapPin, Phone, Clock } from 'lucide-react';

interface DeviceDetailModalProps {
  device: Device | null;
  onClose: () => void;
}

export function DeviceDetailModal({ device, onClose }: DeviceDetailModalProps) {
  if (!device) return null;

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'medium':
        return 'text-amber-600 bg-amber-50';
      case 'low':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-amber-100 text-amber-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end md:items-center justify-center z-50">
      <Card className="w-full md:w-96 md:max-h-[90vh] overflow-y-auto rounded-t-lg md:rounded-lg bg-white border-gray-200">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-red-600 to-red-700">
          <div className="flex-1">
            <h2 className="text-lg font-bold text-white mb-1">{device.name}</h2>
            <p className="text-sm text-red-100">ID: {device.id}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-white hover:bg-red-700 flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Risk Assessment */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Risk Assessment
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <Card
                className={`p-3 border-2 ${getRiskColor(device.riskLevel)} ${
                  device.riskLevel === 'high'
                    ? 'border-red-300'
                    : device.riskLevel === 'medium'
                      ? 'border-amber-300'
                      : 'border-green-300'
                }`}
              >
                <p className="text-xs font-medium mb-1">Risk Level</p>
                <p className="text-lg font-bold capitalize">
                  {device.riskLevel}
                </p>
              </Card>
              <Card className="p-3 border-gray-200 bg-gray-50">
                <p className="text-xs font-medium text-gray-600 mb-1">
                  Risk Score
                </p>
                <p className="text-lg font-bold text-gray-900">
                  {device.riskScore}/100
                </p>
              </Card>
            </div>
          </div>

          {/* Personal Information */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm">
              Personal Information
            </h3>
            <div className="space-y-2 bg-gray-50 p-3 rounded-md">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Age</span>
                <span className="font-medium text-gray-900">
                  {device.age} years
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                <span className="text-xs text-gray-600">
                  Phone
                </span>
                <a
                  href={`tel:${device.contact}`}
                  className="font-medium text-red-600 hover:underline"
                >
                  {device.contact}
                </a>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                <span className="text-xs text-gray-600">
                  Status
                </span>
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded ${getStatusColor(device.status)}`}
                >
                  {device.status.charAt(0).toUpperCase() +
                    device.status.slice(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Health Information */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 text-sm">
              Health Profile
            </h3>
            <div className="space-y-2">
              <Card className="p-3 border-gray-200 bg-gray-50">
                <p className="text-xs font-medium text-gray-600 mb-2">
                  Conditions
                </p>
                {device.healthConditions.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {device.healthConditions.map((condition, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded"
                      >
                        {condition}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-green-600 font-medium">
                    No chronic conditions
                  </p>
                )}
              </Card>
            </div>
          </div>

          {/* Location Information */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 text-sm flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Location
            </h3>
            <div className="space-y-2 bg-gray-50 p-3 rounded-md">
              <div className="text-sm">
                <p className="text-xs text-gray-600 mb-1">
                  Zone
                </p>
                <p className="font-medium text-gray-900">
                  {device.zone}
                </p>
              </div>
              <div className="text-sm pt-2 border-t border-gray-200">
                <p className="text-xs text-gray-600 mb-1">
                  Coordinates
                </p>
                <p className="font-mono text-xs text-gray-900">
                  {device.latitude.toFixed(4)}, {device.longitude.toFixed(4)}
                </p>
              </div>
            </div>
          </div>

          {/* Last Updated */}
          <div className="flex items-center gap-2 text-xs text-gray-600 pt-2 border-t border-gray-200">
            <Clock className="w-4 h-4" />
            <span>Last Updated: {device.lastUpdated}</span>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-4 border-t border-gray-200">
            <Button
              variant="outline"
              size="sm"
            >
              Call
            </Button>
            <Button
              variant="outline"
              size="sm"
            >
              Send Alert
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
