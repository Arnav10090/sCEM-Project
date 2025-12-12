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
        <div className="flex-1 min-w-0">
          <div className="kpi-label">Plant</div>
          <div className="kpi-value">{selectedEquipment.plant}</div>
        </div>
        <div className="w-8 h-8 border border-dashed border-border rounded flex-shrink-0 flex items-center justify-center">
          <span className="text-xs text-muted-foreground">Logo</span>
        </div>
      </div>

      {/* Card 3: Equipment */}
      <div className="kpi-card">
        <div className="flex-1 min-w-0">
          <div className="kpi-label">Equipment</div>
          <div className="kpi-value">{selectedEquipment.name}</div>
        </div>
        <div className="w-8 h-8 border border-dashed border-border rounded flex-shrink-0 flex items-center justify-center">
          <span className="text-xs text-muted-foreground">Logo</span>
        </div>
      </div>

      {/* Card 4: Criticality Level */}
      <div className="kpi-card">
        <div className="flex-1 min-w-0">
          <div className="kpi-label">Criticality Level</div>
          <div className={`kpi-value ${criticityColor}`}>{selectedEquipment.criticality}</div>
        </div>
        <div className="w-8 h-8 border border-dashed border-border rounded flex-shrink-0 flex items-center justify-center">
          <span className="text-xs text-muted-foreground">Logo</span>
        </div>
      </div>

      {/* Card 5: Equipment Status */}
      <div className="kpi-card">
        <div className="flex-1 min-w-0">
          <div className="kpi-label">Equipment Status</div>
          <div className={`px-2 py-1 rounded font-medium text-white text-xs text-center mt-1`} style={{ backgroundColor: selectedEquipment.statusColor }}>
            {selectedEquipment.status}
          </div>
        </div>
      </div>

      {/* Card 6: Spare Tab */}
      <div className="kpi-card">
        <div className="flex-1 min-w-0">
          <div className="kpi-label">Spare Tab</div>
          <div className="kpi-value">{selectedEquipment.spareParts}</div>
        </div>
        <div className="w-8 h-8 border border-dashed border-border rounded flex-shrink-0 flex items-center justify-center">
          <span className="text-xs text-muted-foreground">Logo</span>
        </div>
      </div>

      {/* Card 7: Inspection Date */}
      <div className="kpi-card">
        <div className="flex-1 min-w-0">
          <div className="kpi-label">Inspection Date</div>
          <div className="text-xs space-y-0.5 mt-1">
            <div className="flex justify-between gap-1">
              <span className="text-muted-foreground text-xs">Last:</span>
              <span className="font-mono text-xs">{selectedEquipment.lastInspectionDate}</span>
            </div>
            <div className="flex justify-between gap-1">
              <span className="text-muted-foreground text-xs">Sch:</span>
              <span className="font-mono text-xs">{selectedEquipment.scheduledInspectionDate}</span>
            </div>
            <div className="flex justify-between gap-1">
              <span className="text-muted-foreground text-xs">Act:</span>
              <span className="font-mono text-xs">{selectedEquipment.actualInspectionDate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KPICards;
