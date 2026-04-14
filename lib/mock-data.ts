// Mock IoT Device Data for Lemery, Batangas
export interface Device {
  id: string;
  name: string;
  age: number;
  latitude: number;
  longitude: number;
  status: 'active' | 'inactive' | 'warning';
  healthConditions: string[];
  contact: string;
  riskScore: number;
  riskLevel: 'high' | 'medium' | 'low';
  lastUpdated: string;
  zone: string;
  isolationScore: number;
}

// Lemery, Batangas coordinates: 13.9534, 120.8506
const LEMERY_CENTER = { lat: 13.9534, lon: 120.8506 };

// Generate mock devices within Lemery area
export const mockDevices: Device[] = [
  {
    id: 'IOT-001',
    name: 'Maria Santos',
    age: 72,
    latitude: 13.9534,
    longitude: 120.8506,
    status: 'active',
    healthConditions: ['Hypertension', 'Diabetes'],
    contact: '09171234567',
    riskScore: 92,
    riskLevel: 'high',
    lastUpdated: '2024-04-14 14:32:00',
    zone: 'Zone A - Downtown',
    isolationScore: 8,
  },
  {
    id: 'IOT-002',
    name: 'Juan dela Cruz',
    age: 68,
    latitude: 13.9550,
    longitude: 120.8520,
    status: 'active',
    healthConditions: ['Heart Disease'],
    contact: '09175554567',
    riskScore: 88,
    riskLevel: 'high',
    lastUpdated: '2024-04-14 14:28:15',
    zone: 'Zone A - Downtown',
    isolationScore: 7,
  },
  {
    id: 'IOT-003',
    name: 'Rosa Garcia',
    age: 76,
    latitude: 13.9480,
    longitude: 120.8480,
    status: 'active',
    healthConditions: ['COPD', 'Arthritis'],
    contact: '09181234567',
    riskScore: 95,
    riskLevel: 'high',
    lastUpdated: '2024-04-14 14:35:22',
    zone: 'Zone B - East',
    isolationScore: 9,
  },
  {
    id: 'IOT-004',
    name: 'Antonio Reyes',
    age: 64,
    latitude: 13.9600,
    longitude: 120.8550,
    status: 'active',
    healthConditions: ['Asthma'],
    contact: '09169876543',
    riskScore: 65,
    riskLevel: 'medium',
    lastUpdated: '2024-04-14 14:30:00',
    zone: 'Zone C - North',
    isolationScore: 5,
  },
  {
    id: 'IOT-005',
    name: 'Carmen Lopez',
    age: 58,
    latitude: 13.9420,
    longitude: 120.8420,
    status: 'warning',
    healthConditions: ['Thyroid'],
    contact: '09171111111',
    riskScore: 42,
    riskLevel: 'medium',
    lastUpdated: '2024-04-14 14:25:10',
    zone: 'Zone D - South',
    isolationScore: 3,
  },
  {
    id: 'IOT-006',
    name: 'Pedro Mercado',
    age: 71,
    latitude: 13.9520,
    longitude: 120.8620,
    status: 'active',
    healthConditions: ['Hypertension', 'Kidney Disease'],
    contact: '09179999999',
    riskScore: 85,
    riskLevel: 'high',
    lastUpdated: '2024-04-14 14:33:45',
    zone: 'Zone A - Downtown',
    isolationScore: 6,
  },
  {
    id: 'IOT-007',
    name: 'Elena Rodriguez',
    age: 45,
    latitude: 13.9580,
    longitude: 120.8480,
    status: 'active',
    healthConditions: [],
    contact: '09171234568',
    riskScore: 15,
    riskLevel: 'low',
    lastUpdated: '2024-04-14 14:36:00',
    zone: 'Zone C - North',
    isolationScore: 2,
  },
  {
    id: 'IOT-008',
    name: 'Vicente Torres',
    age: 79,
    latitude: 13.9450,
    longitude: 120.8550,
    status: 'active',
    healthConditions: ['Dementia', 'Hypertension'],
    contact: '09181111222',
    riskScore: 96,
    riskLevel: 'high',
    lastUpdated: '2024-04-14 14:29:33',
    zone: 'Zone B - East',
    isolationScore: 9,
  },
  {
    id: 'IOT-009',
    name: 'Lucia Fernandez',
    age: 62,
    latitude: 13.9620,
    longitude: 120.8420,
    status: 'active',
    healthConditions: ['Diabetes'],
    contact: '09172222333',
    riskScore: 55,
    riskLevel: 'medium',
    lastUpdated: '2024-04-14 14:34:12',
    zone: 'Zone D - South',
    isolationScore: 4,
  },
  {
    id: 'IOT-010',
    name: 'Miguel Sanchez',
    age: 75,
    latitude: 13.9370,
    longitude: 120.8370,
    status: 'inactive',
    healthConditions: ['Heart Disease', 'Hypertension'],
    contact: '09183333444',
    riskScore: 80,
    riskLevel: 'high',
    lastUpdated: '2024-04-14 10:15:22',
    zone: 'Zone D - South',
    isolationScore: 8,
  },
  {
    id: 'IOT-011',
    name: 'Sofia Morales',
    age: 52,
    latitude: 13.9530,
    longitude: 120.8360,
    status: 'active',
    healthConditions: ['Hypertension'],
    contact: '09174444555',
    riskScore: 48,
    riskLevel: 'medium',
    lastUpdated: '2024-04-14 14:31:00',
    zone: 'Zone B - East',
    isolationScore: 3,
  },
  {
    id: 'IOT-012',
    name: 'Felipe Gutierrez',
    age: 67,
    latitude: 13.9650,
    longitude: 120.8580,
    status: 'active',
    healthConditions: ['COPD'],
    contact: '09175555666',
    riskScore: 72,
    riskLevel: 'medium',
    lastUpdated: '2024-04-14 14:27:48',
    zone: 'Zone C - North',
    isolationScore: 5,
  },
  {
    id: 'IOT-013',
    name: 'Diane Castro',
    age: 38,
    latitude: 13.9400,
    longitude: 120.8600,
    status: 'active',
    healthConditions: [],
    contact: '09176666777',
    riskScore: 12,
    riskLevel: 'low',
    lastUpdated: '2024-04-14 14:37:15',
    zone: 'Zone A - Downtown',
    isolationScore: 1,
  },
  {
    id: 'IOT-014',
    name: 'Roberto Villegas',
    age: 73,
    latitude: 13.9490,
    longitude: 120.8510,
    status: 'warning',
    healthConditions: ['Hypertension', 'Stroke History'],
    contact: '09177777888',
    riskScore: 87,
    riskLevel: 'high',
    lastUpdated: '2024-04-14 13:45:30',
    zone: 'Zone A - Downtown',
    isolationScore: 7,
  },
  {
    id: 'IOT-015',
    name: 'Angela Monterey',
    age: 55,
    latitude: 13.9700,
    longitude: 120.8650,
    status: 'active',
    healthConditions: [],
    contact: '09178888999',
    riskScore: 28,
    riskLevel: 'low',
    lastUpdated: '2024-04-14 14:32:50',
    zone: 'Zone C - North',
    isolationScore: 2,
  },
  {
    id: 'IOT-016',
    name: 'Oscar Navarre',
    age: 77,
    latitude: 13.9350,
    longitude: 120.8500,
    status: 'active',
    healthConditions: ['Heart Disease', 'Diabetes', 'Hypertension'],
    contact: '09179999000',
    riskScore: 93,
    riskLevel: 'high',
    lastUpdated: '2024-04-14 14:24:15',
    zone: 'Zone D - South',
    isolationScore: 8,
  },
];

export function calculateRiskScore(device: Device): number {
  let score = 0;

  // Age factor (max 40 points)
  if (device.age >= 75) score += 40;
  else if (device.age >= 65) score += 30;
  else if (device.age >= 55) score += 15;
  else score += 5;

  // Health conditions factor (max 35 points)
  const severeConditions = [
    'Heart Disease',
    'Dementia',
    'COPD',
    'Kidney Disease',
  ];
  const moderateConditions = ['Diabetes', 'Hypertension', 'Stroke History'];

  device.healthConditions.forEach((condition) => {
    if (severeConditions.includes(condition)) score += 15;
    else if (moderateConditions.includes(condition)) score += 8;
    else score += 3;
  });

  // Isolation factor (max 15 points) - based on isolationScore
  score += device.isolationScore * 1.5;

  // Status factor (max 10 points)
  if (device.status === 'inactive') score += 10;
  else if (device.status === 'warning') score += 5;

  return Math.min(Math.round(score), 100);
}

export function getRiskLevel(score: number): 'high' | 'medium' | 'low' {
  if (score >= 70) return 'high';
  if (score >= 40) return 'medium';
  return 'low';
}

export function getMockDevices(): Device[] {
  return mockDevices.map((device) => ({
    ...device,
    riskScore: calculateRiskScore(device),
    riskLevel: getRiskLevel(calculateRiskScore(device)),
  }));
}
