import { Package, Settings, FileText, Wrench } from 'lucide-react';

const SpareTab = () => {
  return (
    <div className="animate-fade-in h-full flex items-center justify-center min-h-[400px]">
      <div className="text-center space-y-6">
        <div className="flex justify-center gap-8 text-muted-foreground">
          <div className="flex flex-col items-center gap-2">
            <Package className="w-12 h-12" />
            <span className="text-xs">Spare Parts</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Settings className="w-12 h-12" />
            <span className="text-xs">Settings</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <FileText className="w-12 h-12" />
            <span className="text-xs">Reports</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Wrench className="w-12 h-12" />
            <span className="text-xs">Maintenance</span>
          </div>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-8 max-w-lg mx-auto">
          <h3 className="text-lg font-medium text-foreground mb-2">Spare Tab</h3>
          <p className="text-muted-foreground text-sm">
            This tab is reserved for future features and custom modules.
          </p>
          <ul className="text-xs text-muted-foreground mt-4 space-y-1">
            <li>• Spare parts inventory</li>
            <li>• Additional reports</li>
            <li>• Custom configurations</li>
            <li>• Extended functionality</li>
          </ul>
          <p className="text-xs text-muted-foreground mt-4">
            Content coming soon...
          </p>
        </div>
      </div>
    </div>
  );
};

export default SpareTab;
