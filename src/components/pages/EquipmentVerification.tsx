import { useState, useEffect, useRef } from 'react';
import { useEquipment } from '@/context/EquipmentContext';
import DropdownSelect from '../common/DropdownSelect';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Camera, Upload, X } from 'lucide-react';

const engineers = ['John Smith', 'Jane Doe', 'Mike Johnson', 'Sarah Williams', 'Tom Brown'];

const defaultEquipmentObservations: Record<string, string[]> = {
  'motor-001': [
    '• Equipment condition is normal',
    '• All connections are secure',
    '• No visible damage detected'
  ],
  'plc-001': [
    '• System running smoothly',
    '• All parameters within range',
    '• No alarms generated'
  ],
  'drive-001': [
    '• Drive is operational',
    '• Temperature is nominal',
    '• No faults detected'
  ],
  'pump-001': [
    '• Pump running normally',
    '• Flow rate stable',
    '• No leaks observed'
  ]
};

const equipmentInterlocks: Record<string, Array<{ id: number; name: string; description: string }>> = {
  'motor-001': [
    { id: 1, name: 'High Temperature', description: 'Image taken for this with instrument at site' },
    { id: 2, name: 'Vibration Interlock', description: 'Image taken for this with sensors at site' },
    { id: 3, name: 'Safety Interlock', description: 'Image taken for this at site' },
    { id: 4, name: 'High Current', description: 'Image taken for this with instrument at site' },
    { id: 5, name: 'Overload Protection', description: 'Image taken for this with sensors at site' },
    { id: 6, name: 'Phase Failure', description: 'Image taken for this at site' }
  ],
  'plc-001': [
    { id: 1, name: 'Communication Failure', description: 'Image taken for this with instrument at site' },
    { id: 2, name: 'Power Supply Fault', description: 'Image taken for this with sensors at site' },
    { id: 3, name: 'CPU Error', description: 'Image taken for this at site' },
    { id: 4, name: 'I/O Module Fault', description: 'Image taken for this with instrument at site' },
    { id: 5, name: 'Watchdog Timer', description: 'Image taken for this with sensors at site' },
    { id: 6, name: 'Program Execution Error', description: 'Image taken for this at site' }
  ],
  'drive-001': [
    { id: 1, name: 'Overvoltage Protection', description: 'Image taken for this with instrument at site' },
    { id: 2, name: 'Undervoltage Protection', description: 'Image taken for this with sensors at site' },
    { id: 3, name: 'Overcurrent Trip', description: 'Image taken for this at site' },
    { id: 4, name: 'Overtemperature', description: 'Image taken for this with instrument at site' },
    { id: 5, name: 'Ground Fault', description: 'Image taken for this with sensors at site' },
    { id: 6, name: 'Emergency Stop', description: 'Image taken for this at site' }
  ],
  'pump-001': [
    { id: 1, name: 'High Pressure', description: 'Image taken for this with instrument at site' },
    { id: 2, name: 'Low Flow', description: 'Image taken for this with sensors at site' },
    { id: 3, name: 'Cavitation Detection', description: 'Image taken for this at site' },
    { id: 4, name: 'Seal Leakage', description: 'Image taken for this with instrument at site' },
    { id: 5, name: 'Bearing Temperature', description: 'Image taken for this with sensors at site' },
    { id: 6, name: 'Vibration Alert', description: 'Image taken for this at site' }
  ]
};

const EquipmentVerification = () => {
  const { selectedEquipment } = useEquipment();
  const [interlocks, setInterlocks] = useState<Array<{ id: number; name: string; description: string }>>([]);
  const [verifiedBy, setVerifiedBy] = useState<string>('');
  const [confirmedBy, setConfirmedBy] = useState<string>('');
  const [overallStatus, setOverallStatus] = useState<'Good' | 'Bad' | 'Worst'>('Good');
  const [interlockImages, setInterlockImages] = useState<Record<number, string[]>>(() => {
    const saved = localStorage.getItem('equipmentVerificationImages');
    return saved ? JSON.parse(saved) : {};
  });
  const [observations, setObservations] = useState<Record<string, string[]>>(() => {
    const saved = localStorage.getItem('equipmentVerificationObservations');
    return saved ? JSON.parse(saved) : defaultEquipmentObservations;
  });
  const [editingObsIdx, setEditingObsIdx] = useState<number | null>(null);
  const [editingObsText, setEditingObsText] = useState<string>('');
  const [newObsText, setNewObsText] = useState<string>('');
  const fileInputRefs = useRef<Record<number, HTMLInputElement | null>>({});

  useEffect(() => {
    if (selectedEquipment) {
      const equipmentInterlock = equipmentInterlocks[selectedEquipment.id];
      setInterlocks(equipmentInterlock || equipmentInterlocks['motor-001']);
      setVerifiedBy('');
      setConfirmedBy('');
      setOverallStatus('Good');
    }
  }, [selectedEquipment?.id]);

  const getStatusClass = () => {
    switch (overallStatus) {
      case 'Good': return 'status-good';
      case 'Bad': return 'status-bad';
      case 'Worst': return 'status-worst';
    }
  };

  const handleImageUpload = (interlockId: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        const updatedImages = {
          ...interlockImages,
          [interlockId]: [...(interlockImages[interlockId] || []), dataUrl]
        };
        setInterlockImages(updatedImages);
        localStorage.setItem('equipmentVerificationImages', JSON.stringify(updatedImages));
      };
      reader.readAsDataURL(file);
    }
    if (fileInputRefs.current[interlockId]) {
      fileInputRefs.current[interlockId]!.value = '';
    }
  };

  return (
    <div className="grid grid-cols-4 gap-3 h-full animate-fade-in">
      {/* Left Column - Interlock List & Observations */}
      <div className="flex flex-col gap-3 h-full">
        {/* Critical Interlock List */}
        <div className="bg-card border border-border rounded-lg p-4 overflow-auto flex-1">
          <h4 className="text-sm font-medium text-gray-900 mb-3">
            Critical / Important Interlock List
          </h4>
          <ul className="space-y-2 text-sm text-gray-900">
            {interlocks.map((interlock) => (
              <li key={interlock.id} className="truncate">{interlock.id}. {interlock.name}</li>
            ))}
          </ul>
        </div>

        {/* Observations by Person Checking */}
        <div className="bg-card border border-border rounded-lg p-4 h-1/2 overflow-auto">
          <h5 className="text-sm font-medium text-gray-900 mb-3">Observations by person checking</h5>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>• {selectedEquipment?.name}</li>
            <li>• {selectedEquipment?.type}</li>
          </ul>
        </div>
      </div>

      {/* Middle Column - Interlock Status Boxes (Grid 2x3) */}
      <div className="col-span-2">
        <div className="grid grid-cols-2 gap-3 h-full">
          {interlocks.slice(0, 6).map((interlock) => (
            <div key={interlock.id} className="bg-card border border-border rounded-lg overflow-hidden flex flex-col">
              <div className="bg-muted px-3 py-2 border-b border-border flex-shrink-0">
                <span className="text-sm font-medium truncate block">{interlock.id}. {interlock.name}</span>
              </div>
              <div className="p-3 flex flex-col flex-1 justify-between">
                <div className="flex-1 bg-muted border border-border rounded flex items-center justify-center mb-2 overflow-hidden">
                  {interlockImages[interlock.id]?.[0] ? (
                    <img
                      src={interlockImages[interlock.id][0]}
                      alt={`${interlock.name} image`}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <Camera className="w-6 h-6 text-muted-foreground opacity-50" />
                  )}
                </div>
                <p className="text-sm text-gray-900 text-center line-clamp-2 mb-2">{interlock.description}</p>
                <input
                  ref={(el) => {
                    if (el) fileInputRefs.current[interlock.id] = el;
                  }}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(interlock.id, e)}
                  className="hidden"
                />
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full text-xs h-8"
                  onClick={() => fileInputRefs.current[interlock.id]?.click()}
                >
                  <Upload className="w-3 h-3 mr-1" />
                  Upload
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Columns - Status & Info */}
      <div className="flex flex-col gap-3 h-full">
        {/* Top Row - Dates and Status Cards Side by Side */}
        <div className="grid grid-cols-2 gap-3">
          {/* Dates Card */}
          <div className="bg-card border border-border rounded-lg p-4">
            <h5 className="text-sm font-medium text-gray-900 mb-3">Inspection Dates</h5>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last:</span>
                <span className="font-mono">{selectedEquipment?.lastInspectionDate || '12/01/2024'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Scheduled:</span>
                <span className="font-mono">{selectedEquipment?.scheduledInspectionDate || '12/15/2024'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Actual:</span>
                <span className="font-mono">{selectedEquipment?.actualInspectionDate || '12/10/2024'}</span>
              </div>
            </div>
          </div>

          {/* Overall Status Card */}
          <div className="bg-card border border-border rounded-lg p-4 flex flex-col justify-between">
            <div>
              <h5 className="text-sm font-medium text-gray-900 mb-3">Overall Status</h5>
              <div className={`text-center py-2 rounded font-bold text-white text-sm ${getStatusClass()}`}>
                {overallStatus}
              </div>
            </div>
            <div className="flex gap-2">
              {(['Good', 'Bad', 'Worst'] as const).map((status) => (
                <Button
                  key={status}
                  variant="outline"
                  size="sm"
                  className="flex-1 text-sm py-1 h-auto"
                  onClick={() => setOverallStatus(status)}
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Verification Card */}
        <div className="bg-card border border-border rounded-lg p-4">
          <h5 className="text-sm font-medium text-gray-900 mb-4">Verification</h5>
          <DropdownSelect
            label="Verified By"
            options={engineers}
            value={verifiedBy}
            onChange={setVerifiedBy}
            placeholder="Select..."
          />
          <div className="mt-3">
            <DropdownSelect
              label="Confirmed By"
              options={engineers}
              value={confirmedBy}
              onChange={setConfirmedBy}
              placeholder="Select..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentVerification;
