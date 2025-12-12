interface KPICardsProps {
  lastInspectionDate?: string;
  scheduledInspectionDate?: string;
  actualInspectionDate?: string;
}

const KPICards = ({ 
  lastInspectionDate = "12/01/2024",
  scheduledInspectionDate = "12/15/2024",
  actualInspectionDate = "12/10/2024"
}: KPICardsProps) => {
  return (
    <div className="grid grid-cols-6 gap-4 p-4 bg-muted/30">
      {/* Plant */}
      <div className="kpi-card">
        <span className="kpi-label">Plant</span>
        <div className="w-12 h-12 border border-dashed border-border rounded flex items-center justify-center">
          <span className="text-xs text-muted-foreground">Logo</span>
        </div>
        <span className="kpi-value mt-1">RCM-1</span>
      </div>

      {/* Equipment */}
      <div className="kpi-card">
        <span className="kpi-label">Equipment</span>
        <div className="w-12 h-12 border border-dashed border-border rounded flex items-center justify-center">
          <span className="text-xs text-muted-foreground">Logo</span>
        </div>
        <span className="kpi-value mt-1">Main Motor</span>
      </div>

      {/* Criticality Level */}
      <div className="kpi-card">
        <span className="kpi-label">Criticality Level</span>
        <div className="w-12 h-12 border border-dashed border-border rounded flex items-center justify-center">
          <span className="text-xs text-muted-foreground">Logo</span>
        </div>
        <span className="kpi-value mt-1 text-industrial-red">Most Critical</span>
      </div>

      {/* Equipment Status */}
      <div className="kpi-card">
        <span className="kpi-label">Equipment Status</span>
        <div className="flex gap-2 mt-2">
          <div className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded font-medium">
            RUN
          </div>
          <div className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
            STANDBY
          </div>
          <div className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
            STOP
          </div>
        </div>
      </div>

      {/* Spare Tab */}
      <div className="kpi-card">
        <span className="kpi-label">Spare Tab</span>
        <div className="w-12 h-12 border border-dashed border-border rounded flex items-center justify-center">
          <span className="text-xs text-muted-foreground">Logo</span>
        </div>
        <span className="kpi-value mt-1">XX</span>
      </div>

      {/* Inspection Date */}
      <div className="kpi-card">
        <span className="kpi-label">Inspection Date</span>
        <div className="text-xs space-y-1 mt-2">
          <div className="flex justify-between gap-2">
            <span className="text-muted-foreground">Last:</span>
            <span className="font-mono">{lastInspectionDate}</span>
          </div>
          <div className="flex justify-between gap-2">
            <span className="text-muted-foreground">Scheduled:</span>
            <span className="font-mono">{scheduledInspectionDate}</span>
          </div>
          <div className="flex justify-between gap-2">
            <span className="text-muted-foreground">Actual:</span>
            <span className="font-mono">{actualInspectionDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KPICards;
