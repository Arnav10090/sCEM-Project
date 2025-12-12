import { useState } from 'react';
import ImagePanel from '../common/ImagePanel';
import DropdownSelect from '../common/DropdownSelect';
import { Button } from '@/components/ui/button';

const engineers = ['John Smith', 'Jane Doe', 'Mike Johnson', 'Sarah Williams', 'Tom Brown'];

const MainDashboard = () => {
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
      {/* Image Comparison Section */}
      <div className="grid grid-cols-2 gap-4">
        <ImagePanel title="Image Captured During Inspection" />
        <ImagePanel title="Last Image Captured" />
      </div>

      {/* Three-Column Information Section */}
      <div className="grid grid-cols-4 gap-4">
        {/* Observations */}
        <div className="bg-card border border-border rounded-lg p-4">
          <h4 className="text-sm font-medium text-industrial-red mb-3">
            Observations based on image comparison (Old and Latest)
          </h4>
          <ul className="space-y-2 text-sm text-industrial-red">
            <li>1. Predefined observations - xxxxxxxxxxxxx</li>
            <li>2. xxxxxxxxxxxxxxxxxxx</li>
            <li>3. xxxxxxxxxxxxxxxxxxx</li>
          </ul>
        </div>

        {/* Checklist */}
        <div className="bg-card border border-border rounded-lg p-4">
          <h4 className="text-sm font-medium text-industrial-red mb-3">
            Checklist of Equipment
          </h4>
          <p className="text-xs text-industrial-red mb-2">Various parameters of equipment ex.</p>
          <ul className="space-y-1 text-sm text-industrial-red">
            <li>1. Temperature of Bearing</li>
            <li>2. Vibration in Motor</li>
            <li>3. Physical - Dust</li>
            <li>4. Overall status</li>
          </ul>
          <div className="mt-4 p-2 bg-muted rounded text-xs text-center">
            <p>Status in Checked/Not-Checked</p>
            <p>to be displayed</p>
          </div>
        </div>

        {/* Person Observations + Comments */}
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="text-sm font-medium text-industrial-red mb-3">
              Observations by person checking
            </h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• xxxxxxxxxxxxxx</li>
              <li>• xxxxxxxxxxxxxx</li>
              <li>• xxxxxxxxxxxxxx</li>
            </ul>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="text-sm font-medium text-industrial-red mb-3">
              Add comments during inspection
            </h4>
            <ul className="space-y-1 text-sm text-industrial-red">
              <li>1. More vibrations</li>
              <li>2. Noise from bearings</li>
              <li>3. Motor heated up</li>
            </ul>
          </div>
        </div>

        {/* Dates and Status */}
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Last Inspection Date:</span>
              <span className="font-mono">12/01/2024</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Scheduled Inspection Date:</span>
              <span className="font-mono">12/15/2024</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Actual Inspection Date:</span>
              <span className="font-mono">12/10/2024</span>
            </div>
          </div>

          <div className="mt-6 p-3 border border-border rounded-lg">
            <h5 className="text-sm font-medium text-industrial-red mb-2">Overall Equipment Status</h5>
            <div className={`text-center py-2 rounded font-bold ${getStatusClass()}`}>
              {overallStatus}
            </div>
            <div className="flex gap-1 mt-2">
              {(['Good', 'Bad', 'Worst'] as const).map((status) => (
                <Button
                  key={status}
                  variant="outline"
                  size="sm"
                  className="flex-1 text-xs"
                  onClick={() => setOverallStatus(status)}
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Verification Section */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-center gap-8">
          <DropdownSelect
            label="Verified By"
            options={engineers}
            value={verifiedBy}
            onChange={setVerifiedBy}
            placeholder="Select name..."
          />
          <DropdownSelect
            label="Confirmed By"
            options={engineers}
            value={confirmedBy}
            onChange={setConfirmedBy}
            placeholder="Select name..."
          />
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
