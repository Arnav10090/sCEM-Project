import { Network, Server, Database, Monitor, Cpu, Wifi } from 'lucide-react';

const SystemArchitecture = () => {
  return (
    <div className="animate-fade-in h-full flex items-center justify-center min-h-[400px]">
      <div className="text-center space-y-8">
        <div className="flex justify-center gap-12 text-muted-foreground">
          <div className="flex flex-col items-center gap-3">
            <Server className="w-16 h-16" />
            <span className="text-sm">Server</span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Database className="w-16 h-16" />
            <span className="text-sm">Database</span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Network className="w-16 h-16" />
            <span className="text-sm">Network</span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Monitor className="w-16 h-16" />
            <span className="text-sm">HMI</span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Cpu className="w-16 h-16" />
            <span className="text-sm">PLC</span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Wifi className="w-16 h-16" />
            <span className="text-sm">IoT</span>
          </div>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-8 max-w-lg mx-auto">
          <h3 className="text-xl font-medium text-foreground mb-3">System Architecture</h3>
          <p className="text-muted-foreground text-base">
            System architecture diagrams and network topology will be displayed here.
          </p>
          <p className="text-sm text-muted-foreground mt-6">
            Content coming soon...
          </p>
        </div>
      </div>
    </div>
  );
};

export default SystemArchitecture;
