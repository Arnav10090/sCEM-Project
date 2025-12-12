import { useState, useEffect } from 'react';
import { useEquipment } from '@/context/EquipmentContext';
import ImagePanel from '../common/ImagePanel';
import ChecklistTable from './ChecklistTable';
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

const equipmentChecklists: Record<string, Array<{ id: string; parameter: string; isChecked: boolean; comment: string }>> = {
  'motor-001': [
    { id: '1', parameter: 'Temperature of Bearing', isChecked: false, comment: '' },
    { id: '2', parameter: 'Vibration in Motor', isChecked: false, comment: '' },
    { id: '3', parameter: 'Physical - Dust', isChecked: false, comment: '' },
    { id: '4', parameter: 'Overall status', isChecked: false, comment: '' },
  ],
  'plc-001': [
    { id: '1', parameter: 'CPU Temperature', isChecked: false, comment: '' },
    { id: '2', parameter: 'Power Supply Voltage', isChecked: false, comment: '' },
    { id: '3', parameter: 'Communication Status', isChecked: false, comment: '' },
    { id: '4', parameter: 'I/O Module Status', isChecked: false, comment: '' },
  ],
  'drive-001': [
    { id: '1', parameter: 'Output Frequency', isChecked: false, comment: '' },
    { id: '2', parameter: 'Output Current', isChecked: false, comment: '' },
    { id: '3', parameter: 'Heat Sink Temperature', isChecked: false, comment: '' },
    { id: '4', parameter: 'Drive Status', isChecked: false, comment: '' },
  ],
  'pump-001': [
    { id: '1', parameter: 'Flow Rate', isChecked: false, comment: '' },
    { id: '2', parameter: 'Discharge Pressure', isChecked: false, comment: '' },
    { id: '3', parameter: 'Vibration Level', isChecked: false, comment: '' },
    { id: '4', parameter: 'Motor Current', isChecked: false, comment: '' },
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
      {/* Top Section - Two Column Layout */}
      <div className="grid grid-cols-2 gap-4 items-end">
        {/* Left Column - Stacked Images */}
        <div className="flex flex-col gap-1">
          <ImagePanel title="Image Captured During Inspection" />
          <ImagePanel title="Last Image Captured" />
        </div>

        {/* Right Column - Checklist Table and Status Card */}
        <div className="space-y-2">
          {/* Checklist Table */}
          <ChecklistTable initialItems={currentChecklist} />

          {/* Overall Equipment Status Card */}
          <div className="bg-card border border-border rounded-lg p-3">
            <div className="space-y-2 text-xs mb-3">
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

            <div className="p-2 border border-border rounded-lg">
              <h5 className="text-xs font-medium text-industrial-red mb-1">Overall Equipment Status</h5>
              <div className={`text-center py-1 rounded font-bold text-white mb-2 text-xs ${getStatusClass()}`}>
                {overallStatus}
              </div>
              <div className="flex gap-1">
                {(['Good', 'Bad', 'Worst'] as const).map((status) => (
                  <Button
                    key={status}
                    variant="outline"
                    size="sm"
                    className="flex-1 text-xs py-1 h-auto"
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

      {/* Bottom Section - Three Cards */}
      <div className="grid grid-cols-3 gap-4">
        {/* Observations Based on Image Comparison */}
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

        {/* Observations by Person Checking */}
        <div className="bg-card border border-border rounded-lg p-4">
          <h4 className="text-sm font-medium text-industrial-red mb-3">
            Observations by person checking
          </h4>
          <ul className="space-y-1 text-sm text-muted-foreground">
            {currentComments.map((comment, idx) => (
              <li key={idx}>{comment}</li>
            ))}
          </ul>
        </div>

        {/* Verified By / Confirmed By */}
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="space-y-4">
            <DropdownSelect
              label="Verified By"
              options={engineers}
              value={verifiedBy}
              onChange={setVerifiedBy}
              placeholder="Name from drop down list"
            />
            <DropdownSelect
              label="Confirmed By"
              options={engineers}
              value={confirmedBy}
              onChange={setConfirmedBy}
              placeholder="Name from drop down list"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
