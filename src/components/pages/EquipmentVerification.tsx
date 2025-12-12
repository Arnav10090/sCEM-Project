import { useState } from 'react';
import DropdownSelect from '../common/DropdownSelect';
import { Button } from '@/components/ui/button';
import { Camera } from 'lucide-react';

const engineers = ['John Smith', 'Jane Doe', 'Mike Johnson', 'Sarah Williams', 'Tom Brown'];

const interlocks = [
  { id: 1, name: 'High Temperature', description: 'Image taken for this with instrument at site' },
  { id: 2, name: 'Vibration Interlock', description: 'Image taken for this with sensors at site' },
  { id: 3, name: 'Safety Interlock', description: 'Image taken for this at site' },
  { id: 4, name: 'High Current', description: 'Image taken for this with instrument at site' },
  { id: 5, name: 'xxxxxxxxxxxxx', description: 'Image taken for this with sensors at site' },
  { id: 6, name: 'xxxxxxxxxxxxx', description: 'Image taken for this at site' },
];

const EquipmentVerification = () => {
  const [verifiedBy, setVerifiedBy] = useState<string>('');
  const [confirmedBy, setConfirmedBy] = useState<string>('');
  const [overallStatus, setOverallStatus] = useState<'Good' | 'Bad' | 'Worst'>('Good');

  const getStatusClass = () => {
    switch (overallStatus) {
      case 'Good': return 'status-good';
      case 'Bad': return 'status-bad';
      case 'Worst': return 'status-worst';
    }
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="grid grid-cols-12 gap-4">
        {/* Left Sidebar - Interlock List */}
        <div className="col-span-2 bg-card border border-border rounded-lg p-4">
          <h4 className="text-sm font-medium text-industrial-red mb-3">
            Critical / Important Interlock List
          </h4>
          <ul className="space-y-2 text-sm text-industrial-red">
            {interlocks.map((interlock) => (
              <li key={interlock.id}>{interlock.name}</li>
            ))}
          </ul>
        </div>

        {/* Main Grid - Interlock Status Boxes */}
        <div className="col-span-8">
          <div className="grid grid-cols-3 gap-4">
            {interlocks.map((interlock) => (
              <div key={interlock.id} className="bg-card border border-border rounded-lg overflow-hidden">
                <div className="bg-muted px-3 py-2 border-b border-border">
                  <span className="text-sm font-medium">{interlock.id}. {interlock.name}</span>
                </div>
                <div className="p-4">
                  <div className="aspect-video bg-muted border border-border rounded flex items-center justify-center mb-2">
                    <Camera className="w-8 h-8 text-muted-foreground opacity-50" />
                  </div>
                  <p className="text-xs text-industrial-red text-center">{interlock.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel - Dates */}
        <div className="col-span-2 bg-card border border-border rounded-lg p-4">
          <div className="space-y-4 text-sm">
            <div>
              <span className="text-muted-foreground block">Last Inspection Date:</span>
              <span className="font-mono">12/01/2024</span>
            </div>
            <div>
              <span className="text-muted-foreground block">Scheduled Inspection Date:</span>
              <span className="font-mono">12/15/2024</span>
            </div>
            <div>
              <span className="text-muted-foreground block">Actual Inspection Date:</span>
              <span className="font-mono">12/10/2024</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="grid grid-cols-4 gap-4 items-center">
          {/* Observations */}
          <div>
            <h5 className="text-sm font-medium text-industrial-red mb-2">Observations by person checking</h5>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• xxxxxxxxxxxxxx</li>
              <li>• xxxxxxxxxxxxxx</li>
            </ul>
          </div>

          {/* Verified By */}
          <DropdownSelect
            label="Verified By"
            options={engineers}
            value={verifiedBy}
            onChange={setVerifiedBy}
            placeholder="Select name..."
          />

          {/* Confirmed By */}
          <DropdownSelect
            label="Confirmed By"
            options={engineers}
            value={confirmedBy}
            onChange={setConfirmedBy}
            placeholder="Select name..."
          />

          {/* Overall Status */}
          <div className="text-center">
            <h5 className="text-sm font-medium text-industrial-red mb-2">Overall Equipment Status</h5>
            <div className={`py-1 px-3 rounded font-medium text-sm inline-block ${getStatusClass()}`}>
              {overallStatus}
            </div>
            <div className="flex gap-1 mt-2 justify-center">
              {(['Good', 'Bad', 'Worst'] as const).map((status) => (
                <Button
                  key={status}
                  variant="outline"
                  size="sm"
                  className="text-xs h-6 px-2"
                  onClick={() => setOverallStatus(status)}
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentVerification;
