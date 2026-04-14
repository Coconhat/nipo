'use client';

import { Device } from '@/lib/mock-data';
import { Card } from '@/components/ui/card';
import { AlertCircle, Heart, Users, TrendingUp } from 'lucide-react';

interface AnalyticsPanelProps {
  devices: Device[];
  filteredDevices: Device[];
}

export function AnalyticsPanel({
  devices,
  filteredDevices,
}: AnalyticsPanelProps) {
  const highRiskCount = filteredDevices.filter(
    (d) => d.riskLevel === 'high'
  ).length;
  const inactiveCount = filteredDevices.filter(
    (d) => d.status === 'inactive'
  ).length;
  const averageAge =
    filteredDevices.length > 0
      ? Math.round(
          filteredDevices.reduce((sum, d) => sum + d.age, 0) /
            filteredDevices.length
        )
      : 0;
  const avgRiskScore =
    filteredDevices.length > 0
      ? Math.round(
          filteredDevices.reduce((sum, d) => sum + d.riskScore, 0) /
            filteredDevices.length
        )
      : 0;

  // Get vulnerable population insights
  const elderlyVulnerable = filteredDevices.filter(
    (d) => d.age >= 75 && d.riskLevel === 'high'
  );
  const chronicConditions = filteredDevices.filter(
    (d) => d.healthConditions.length >= 2
  );
  const isolated = filteredDevices.filter((d) => d.isolationScore >= 7);

  return (
    <div className="space-y-4">
      {/* Top Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-red-700 mb-1">
                High Risk
              </p>
              <p className="text-2xl font-bold text-red-900">
                {highRiskCount}
              </p>
            </div>
            <AlertCircle className="w-5 h-5 text-red-600" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-amber-700 mb-1">
                Inactive
              </p>
              <p className="text-2xl font-bold text-amber-900">
                {inactiveCount}
              </p>
            </div>
            <Users className="w-5 h-5 text-amber-600" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-pink-700 mb-1">
                Avg Age
              </p>
              <p className="text-2xl font-bold text-pink-900">
                {averageAge}
              </p>
            </div>
            <Heart className="w-5 h-5 text-pink-600" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-gray-700 mb-1">
                Avg Risk Score
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {avgRiskScore}
              </p>
            </div>
            <TrendingUp className="w-5 h-5 text-gray-600" />
          </div>
        </Card>
      </div>

      {/* Vulnerability Insights */}
      <Card className="p-4 bg-white border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-3 text-sm">
          Vulnerable Population Analysis
        </h4>

        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-red-600 mt-1.5 flex-shrink-0"></div>
            <div className="text-sm">
              <p className="font-medium text-gray-900">
                Elderly at High Risk
              </p>
              <p className="text-xs text-gray-600">
                {elderlyVulnerable.length} individuals aged 75+ with high risk scores
              </p>
              {elderlyVulnerable.length > 0 && (
                <p className="text-xs text-red-600 mt-1 font-medium">
                  Action: Priority monitoring and immediate intervention may be needed
                </p>
              )}
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-amber-600 mt-1.5 flex-shrink-0"></div>
            <div className="text-sm">
              <p className="font-medium text-gray-900">
                Multiple Chronic Conditions
              </p>
              <p className="text-xs text-gray-600">
                {chronicConditions.length} individuals with 2+ health conditions
              </p>
              {chronicConditions.length > 0 && (
                <p className="text-xs text-amber-600 mt-1 font-medium">
                  Action: Recommend preventive health check-ups and medication review
                </p>
              )}
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-orange-600 mt-1.5 flex-shrink-0"></div>
            <div className="text-sm">
              <p className="font-medium text-gray-900">
                Isolated Individuals
              </p>
              <p className="text-xs text-gray-600">
                {isolated.length} individuals with limited social contacts
              </p>
              {isolated.length > 0 && (
                <p className="text-xs text-orange-600 mt-1 font-medium">
                  Action: Establish community support programs and regular check-ins
                </p>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Key Recommendations */}
      <Card className="p-4 bg-red-50 border-red-200">
        <h4 className="font-semibold text-red-900 mb-2 text-sm">
          Recommendations
        </h4>
        <ul className="text-xs space-y-1.5 text-red-800">
          <li className="flex gap-2">
            <span className="flex-shrink-0">•</span>
            <span>
              Increase monitoring frequency for{' '}
              <strong>{highRiskCount} high-risk</strong> individuals
            </span>
          </li>
          <li className="flex gap-2">
            <span className="flex-shrink-0">•</span>
            <span>
              Follow up with <strong>{inactiveCount}</strong> inactive users to verify
              status
            </span>
          </li>
          <li className="flex gap-2">
            <span className="flex-shrink-0">•</span>
            <span>
              Coordinate with health facilities for <strong>{elderlyVulnerable.length}</strong>{' '}
              elderly high-risk cases
            </span>
          </li>
        </ul>
      </Card>
    </div>
  );
}
