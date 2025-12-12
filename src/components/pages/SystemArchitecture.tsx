import { Network, Server, Database, Monitor, Cpu, Wifi } from 'lucide-react';

const SystemArchitecture = () => {
  return (
    <div className="animate-fade-in h-full flex items-center justify-center min-h-[400px]">
      <div className="text-center space-y-6">
        <div className="flex justify-center gap-8 text-muted-foreground">
          <div className="flex flex-col items-center gap-2">
            <Server className="w-12 h-12" />
            <span className="text-xs">Server</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Database className="w-12 h-12" />
            <span className="text-xs">Database</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Network className="w-12 h-12" />
            <span className="text-xs">Network</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Monitor className="w-12 h-12" />
            <span className="text-xs">HMI</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Cpu className="w-12 h-12" />
            <span className="text-xs">PLC</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Wifi className="w-12 h-12" />
            <span className="text-xs">IoT</span>
          </div>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-8 max-w-lg mx-auto">
          <h3 className="text-lg font-medium text-foreground mb-2">System Architecture</h3>
          <p className="text-muted-foreground text-sm">
            System architecture diagrams and network topology will be displayed here.
          </p>
          <p className="text-xs text-muted-foreground mt-4">
            Content coming soon...
          </p>
        </div>
      </div>
    </div>
  );
};

export default SystemArchitecture;
