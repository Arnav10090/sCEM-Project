import { useEquipment } from '@/context/EquipmentContext';
import EquipmentSelectorCard from './EquipmentSelectorCard';

const KPICards = () => {
  const { selectedEquipment, isLoading } = useEquipment();

  if (isLoading) {
    return (
      <div className="grid grid-cols-7 gap-4 p-4 bg-muted/30">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="kpi-card animate-pulse">
            <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
            <div className="h-12 bg-muted rounded mb-2"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!selectedEquipment) {
    return (
      <div className="grid grid-cols-7 gap-4 p-4 bg-muted/30">
        <EquipmentSelectorCard />
        <div className="col-span-6 flex items-center justify-center bg-card border border-border rounded-lg p-4">
          <p className="text-muted-foreground text-sm">Please select an equipment to view details</p>
        </div>
      </div>
    );
  }

  const getStatusBgColor = () => {
    switch (selectedEquipment.status) {
      case 'Run':
        return 'bg-green-500';
      case 'Standby':
        return 'bg-amber-500';
      case 'Stop':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const criticality = selectedEquipment.criticality;
  const criticalities: Record<string, string> = {
    'Most critical': 'text-industrial-red',
    'High': 'text-industrial-red',
    'Medium': 'text-industrial-amber',
    'Low': 'text-industrial-gray'
  };
  const criticityColor = criticalities[criticality] || 'text-industrial-gray';

  return (
    <div className="grid grid-cols-7 gap-4 p-4 bg-muted/30">
      {/* Card 1: Equipment Selector */}
      <EquipmentSelectorCard />

      {/* Card 2: Plant */}
      <div className="kpi-card">
        <span className="kpi-label">Plant</span>
        <div className="w-12 h-12 border border-dashed border-border rounded flex items-center justify-center">
          <span className="text-xs text-muted-foreground">Logo</span>
        </div>
        <span className="kpi-value mt-1">{selectedEquipment.plant}</span>
      </div>

      {/* Card 3: Equipment */}
      <div className="kpi-card">
        <span className="kpi-label">Equipment</span>
        <div className="w-12 h-12 border border-dashed border-border rounded flex items-center justify-center">
          <span className="text-xs text-muted-foreground">Logo</span>
        </div>
        <span className="kpi-value mt-1">{selectedEquipment.name}</span>
      </div>

      {/* Card 4: Criticality Level */}
      <div className="kpi-card">
        <span className="kpi-label">Criticality Level</span>
        <div className="w-12 h-12 border border-dashed border-border rounded flex items-center justify-center">
          <span className="text-xs text-muted-foreground">Logo</span>
        </div>
        <span className={`kpi-value mt-1 ${criticityColor}`}>{selectedEquipment.criticality}</span>
      </div>

      {/* Card 5: Equipment Status */}
      <div className="kpi-card">
        <span className="kpi-label">Equipment Status</span>
        <div className={`px-3 py-2 rounded font-medium text-white text-xs mt-2 text-center`} style={{ backgroundColor: selectedEquipment.statusColor }}>
          {selectedEquipment.status}
        </div>
      </div>

      {/* Card 6: Spare Tab */}
      <div className="kpi-card">
        <span className="kpi-label">Spare Tab</span>
        <div className="w-12 h-12 border border-dashed border-border rounded flex items-center justify-center">
          <span className="text-xs text-muted-foreground">Logo</span>
        </div>
        <span className="kpi-value mt-1">{selectedEquipment.spareParts}</span>
      </div>

      {/* Card 7: Inspection Date */}
      <div className="kpi-card">
        <span className="kpi-label">Inspection Date</span>
        <div className="text-xs space-y-1 mt-2">
          <div className="flex justify-between gap-2">
            <span className="text-muted-foreground">Last:</span>
            <span className="font-mono">{selectedEquipment.lastInspectionDate}</span>
          </div>
          <div className="flex justify-between gap-2">
            <span className="text-muted-foreground">Scheduled:</span>
            <span className="font-mono">{selectedEquipment.scheduledInspectionDate}</span>
          </div>
          <div className="flex justify-between gap-2">
            <span className="text-muted-foreground">Actual:</span>
            <span className="font-mono">{selectedEquipment.actualInspectionDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KPICards;
