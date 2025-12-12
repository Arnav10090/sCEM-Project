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
      default: return '';
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
    <div className="w-full h-[calc(100vh-120px)] overflow-hidden p-2">
      {/* GRID: Left | Center | Right */}
      <div className="grid grid-cols-[20%_1fr_28%] h-full gap-3">

        {/* -------------------------------------- */}
        {/* LEFT COLUMN (Images) */}
        {/* -------------------------------------- */}
        <div className="flex flex-col h-full gap-3">
          <div className="h-1/2">
            <ImagePanel title="Image Captured During Inspection" />
          </div>
          <div className="h-1/2">
            <ImagePanel title="Last Image Captured" />
          </div>
        </div>

        {/* -------------------------------------- */}
        {/* CENTER COLUMN (Checklist table) */}
        {/* -------------------------------------- */}
        <div className="h-full overflow-hidden">
          <div className="bg-card border border-border rounded-lg h-full p-3 overflow-auto">
            <ChecklistTable initialItems={currentChecklist} />
          </div>
        </div>

        {/* -------------------------------------- */}
        {/* RIGHT COLUMN — 3 ROWS */}
        {/* -------------------------------------- */}
        <div className="grid grid-rows-[30%_30%_40%] h-full gap-3">

          {/* ---------- ROW 1 (Top row: 2 boxes) ---------- */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-card border border-border rounded-lg p-3 overflow-hidden">
              <h4 className="text-xs text-industrial-red font-medium mb-2">
                Observations based on image comparison
              </h4>
              <ul className="text-xs text-industrial-red space-y-1 overflow-auto h-[85%]">
                {currentObservations.map((obs, i) => <li key={i}>{obs}</li>)}
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-3 flex flex-col">
              <h5 className="text-xs text-industrial-red font-medium mb-2">Overall Equipment Status</h5>

              <div className={`text-center py-1 rounded text-white text-xs font-bold mb-2 ${getStatusClass()}`}>
                {overallStatus}
              </div>

              <div className="flex gap-1 mt-auto">
                {['Good', 'Bad', 'Worst'].map(status => (
                  <Button key={status} size="sm" variant="outline"
                    className="flex-1 text-xs"
                    onClick={() => setOverallStatus(status as any)}
                  >
                    {status}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* ---------- ROW 2 (Middle row: 2 boxes) ---------- */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-card border border-border rounded-lg p-3 text-xs">
              <h5 className="text-industrial-red font-medium mb-2">Last Inspection Date</h5>
              <div className="space-y-1">
                <div className="flex justify-between"><span>Last:</span><span>{selectedEquipment?.lastInspectionDate}</span></div>
                <div className="flex justify-between"><span>Scheduled:</span><span>{selectedEquipment?.scheduledInspectionDate}</span></div>
                <div className="flex justify-between"><span>Actual:</span><span>{selectedEquipment?.actualInspectionDate}</span></div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-3 overflow-hidden">
              <h4 className="text-xs text-industrial-red font-medium mb-2">Observations by person checking</h4>
              <ul className="text-xs text-muted-foreground space-y-1 overflow-auto h-[85%]">
                {currentComments.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            </div>
          </div>

          {/* ---------- ROW 3 (Bottom full width) ---------- */}
          <div className="bg-card border border-border rounded-lg p-3">
            <div className="grid grid-cols-2 gap-3 text-xs">
              <DropdownSelect
                label="Verified By"
                options={engineers}
                value={verifiedBy}
                onChange={setVerifiedBy}
              />
              <DropdownSelect
                label="Confirmed By"
                options={engineers}
                value={confirmedBy}
                onChange={setConfirmedBy}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );

};

export default MainDashboard;
