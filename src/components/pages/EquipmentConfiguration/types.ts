export interface Parameter {
  id: string;
  name: string;
  unit: string;
  lowerThreshold: number | null;
  upperThreshold: number | null;
  dataType: 'Numeric' | 'Boolean' | 'Text';
  alertPriority: 'Critical' | 'High' | 'Medium' | 'Low';
  monitoringEnabled: boolean;
  remarks: string;
}

export interface Equipment {
  id: string;
  name: string;
  type: string;
  criticalityLevel: 'Most critical' | 'High' | 'Medium' | 'Low';
  status: 'Active' | 'Inactive';
  description: string;
  lastUpdated: string;
  parameters: Parameter[];
}

export const equipmentTypes = [
  'Rotating Machinery',
  'Electrical',
  'Instrumentation',
  'Hydraulic',
  'Pneumatic',
  'Other',
];

export const commonUnits = [
  'mm/s',
  '°C',
  'Ampere (A)',
  'RPM',
  'V',
  'Hz',
  'Bar',
  'PSI',
  'ms',
  '%',
  'Boolean',
  'Text',
];
