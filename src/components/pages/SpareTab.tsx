import { Package, Settings, FileText, Wrench } from 'lucide-react';

const SpareTab = () => {
  return (
    <div className="animate-fade-in h-full flex items-center justify-center min-h-[400px]">
      <div className="text-center space-y-8">
        <div className="flex justify-center gap-12 text-muted-foreground">
          <div className="flex flex-col items-center gap-3">
            <Package className="w-16 h-16" />
            <span className="text-sm">Spare Parts</span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Settings className="w-16 h-16" />
            <span className="text-sm">Settings</span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <FileText className="w-16 h-16" />
            <span className="text-sm">Reports</span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Wrench className="w-16 h-16" />
            <span className="text-sm">Maintenance</span>
          </div>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-8 max-w-lg mx-auto">
          <h3 className="text-xl font-medium text-foreground mb-3">Spare Tab</h3>
          <p className="text-muted-foreground text-base">
            This tab is reserved for future features and custom modules.
          </p>
          <ul className="text-sm text-muted-foreground mt-6 space-y-2">
            <li>• Spare parts inventory</li>
            <li>• Additional reports</li>
            <li>• Custom configurations</li>
            <li>• Extended functionality</li>
          </ul>
          <p className="text-sm text-muted-foreground mt-6">
            Content coming soon...
          </p>
        </div>
      </div>
    </div>
  );
};

export default SpareTab;
