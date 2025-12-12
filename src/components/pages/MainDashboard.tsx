import { useState, useEffect } from 'react';
import { useEquipment } from '@/context/EquipmentContext';
import ImagePanel from '../common/ImagePanel';
import DropdownSelect from '../common/DropdownSelect';
import { Button } from '@/components/ui/button';

const engineers = ['John Smith', 'Jane Doe', 'Mike Johnson', 'Sarah Williams', 'Tom Brown'];

const equipmentObservations: Record<string, string[]> = {
  'motor-001': [
    '1. High vibration detected on bearing',
    '2. Temperature slightly elevated',
    '3. Abnormal noise detected'
  ],
  'plc-001': [
    '1. CPU temperature nominal',
    '2. No communication errors',
    '3. All modules responsive'
  ],
  'drive-001': [
    '1. Output frequency stable',
    '2. No overcurrent detected',
    '3. Heat sink temperature normal'
  ],
  'pump-001': [
    '1. Flow rate within limits',
    '2. Pressure stable',
    '3. No cavitation detected'
  ]
};

const equipmentChecklists: Record<string, string[]> = {
  'motor-001': [
    '1. Temperature of Bearing',
    '2. Vibration in Motor',
    '3. Physical - Dust',
    '4. Overall status'
  ],
  'plc-001': [
    '1. CPU Temperature',
    '2. Power Supply Voltage',
    '3. Communication Status',
    '4. I/O Module Status'
  ],
  'drive-001': [
    '1. Output Frequency',
    '2. Output Current',
    '3. Heat Sink Temperature',
    '4. Drive Status'
  ],
  'pump-001': [
    '1. Flow Rate',
    '2. Discharge Pressure',
    '3. Vibration Level',
    '4. Motor Current'
  ]
};

const equipmentComments: Record<string, string[]> = {
  'motor-001': [
    '• More vibrations',
    '• Noise from bearings',
    '• Motor heated up'
  ],
  'plc-001': [
    '• Program execution stable',
    '• Watchdog timer normal',
    '• No errors detected'
  ],
  'drive-001': [
    '• Operating at rated capacity',
    '• Cooling system effective',
    '• Protection circuits active'
  ],
  'pump-001': [
    '• No cavitation issues',
    '• Seal condition good',
    '• Impeller balanced'
  ]
};

const MainDashboard = () => {
  const { selectedEquipment } = useEquipment();
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

  const currentObservations = selectedEquipment 
    ? equipmentObservations[selectedEquipment.id] || equipmentObservations['motor-001']
    : equipmentObservations['motor-001'];

  const currentChecklist = selectedEquipment
    ? equipmentChecklists[selectedEquipment.id] || equipmentChecklists['motor-001']
    : equipmentChecklists['motor-001'];

  const currentComments = selectedEquipment
    ? equipmentComments[selectedEquipment.id] || equipmentComments['motor-001']
    : equipmentComments['motor-001'];

  useEffect(() => {
    setVerifiedBy('');
    setConfirmedBy('');
    setOverallStatus('Good');
  }, [selectedEquipment?.id]);

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
            {currentObservations.map((obs, idx) => (
              <li key={idx}>{obs}</li>
            ))}
          </ul>
        </div>

        {/* Checklist */}
        <div className="bg-card border border-border rounded-lg p-4">
          <h4 className="text-sm font-medium text-industrial-red mb-3">
            Checklist of Equipment
          </h4>
          <p className="text-xs text-industrial-red mb-2">Various parameters of equipment ex.</p>
          <ul className="space-y-1 text-sm text-industrial-red">
            {currentChecklist.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
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
              {currentComments.map((obs, idx) => (
                <li key={idx}>{obs}</li>
              ))}
            </ul>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="text-sm font-medium text-industrial-red mb-3">
              Add comments during inspection
            </h4>
            <ul className="space-y-1 text-sm text-industrial-red">
              {currentComments.map((comment, idx) => (
                <li key={idx}>{comment}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Dates and Status */}
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Last Inspection Date:</span>
              <span className="font-mono">{selectedEquipment?.lastInspectionDate || '12/01/2024'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Scheduled Inspection Date:</span>
              <span className="font-mono">{selectedEquipment?.scheduledInspectionDate || '12/15/2024'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Actual Inspection Date:</span>
              <span className="font-mono">{selectedEquipment?.actualInspectionDate || '12/10/2024'}</span>
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
