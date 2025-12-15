import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Equipment {
  id: string;
  name: string;
  icon: string;
  type: string;
  plant: string;
  criticality: string;
  status: 'Run' | 'Standby' | 'Stop';
  statusColor: string;
  spareParts: string;
  lastInspectionDate: string;
  scheduledInspectionDate: string;
  actualInspectionDate: string;
}

interface EquipmentContextType {
  selectedEquipment: Equipment | null;
  equipmentList: Equipment[];
  handleEquipmentChange: (equipmentId: string) => void;
  isLoading: boolean;
}

const EquipmentContext = createContext<EquipmentContextType | undefined>(undefined);

const equipmentData: Equipment[] = [
  {
    id: 'motor-001',
    name: 'Motor',
    icon: '🔧',
    type: 'Rotating Machinery',
    plant: 'RCM-1',
    criticality: 'Most critical',
    status: 'Run',
    statusColor: '#4CAF50',
    spareParts: 'Available',
    lastInspectionDate: '11/28/2025',
    scheduledInspectionDate: '12/28/2025',
    actualInspectionDate: '11/28/2025'
  },
  {
    id: 'plc-001',
    name: 'PLC',
    icon: '🖥️',
    type: 'Electrical',
    plant: 'Control Room',
    criticality: 'High',
    status: 'Run',
    statusColor: '#4CAF50',
    spareParts: 'Available',
    lastInspectionDate: '11/15/2025',
    scheduledInspectionDate: '12/15/2025',
    actualInspectionDate: '11/15/2025'
  },
  {
    id: 'drive-001',
    name: 'XYZ Drive',
    icon: '⚙️',
    type: 'Electrical',
    plant: 'MCC Room',
    criticality: 'High',
    status: 'Standby',
    statusColor: '#FF9800',
    spareParts: 'Available',
    lastInspectionDate: '12/01/2025',
    scheduledInspectionDate: '01/01/2026',
    actualInspectionDate: '12/01/2025'
  },
  {
    id: 'pump-001',
    name: 'Centrifugal Pump',
    icon: '💧',
    type: 'Rotating Machinery',
    plant: 'Pump House',
    criticality: 'Medium',
    status: 'Run',
    statusColor: '#4CAF50',
    spareParts: 'Available',
    lastInspectionDate: '11/20/2025',
    scheduledInspectionDate: '12/20/2025',
    actualInspectionDate: '11/20/2025'
  }
];

export const EquipmentProvider = ({ children }: { children: ReactNode }) => {
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [equipmentList, setEquipmentList] = useState<Equipment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadEquipmentList = async () => {
      setIsLoading(true);
      
      const savedEquipmentId = localStorage.getItem('selectedEquipmentId');
      setEquipmentList(equipmentData);
      
      if (savedEquipmentId) {
        const equipment = equipmentData.find(eq => eq.id === savedEquipmentId);
        if (equipment) {
          setSelectedEquipment(equipment);
        } else {
          setSelectedEquipment(equipmentData[0]);
        }
      } else {
        setSelectedEquipment(equipmentData[0]);
      }
      
      setIsLoading(false);
    };

    loadEquipmentList();
  }, []);

  const handleEquipmentChange = (equipmentId: string) => {
    const equipment = equipmentList.find(eq => eq.id === equipmentId);
    if (equipment) {
      setSelectedEquipment(equipment);
      localStorage.setItem('selectedEquipmentId', equipmentId);
      localStorage.setItem('selectedEquipmentData', JSON.stringify(equipment));
      
      const recent = JSON.parse(localStorage.getItem('recentEquipment') || '[]');
      const filtered = recent.filter((eq: Equipment) => eq.id !== equipment.id);
      const updated = [equipment, ...filtered].slice(0, 5);
      localStorage.setItem('recentEquipment', JSON.stringify(updated));
    }
  };

  return (
    <EquipmentContext.Provider value={{
      selectedEquipment,
      equipmentList,
      handleEquipmentChange,
      isLoading
    }}>
      {children}
    </EquipmentContext.Provider>
  );
};

export const useEquipment = () => {
  const context = useContext(EquipmentContext);
  if (context === undefined) {
    throw new Error('useEquipment must be used within an EquipmentProvider');
  }
  return context;
};
