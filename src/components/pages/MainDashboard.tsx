import { useState, useEffect } from 'react';
import { useEquipment } from '@/context/EquipmentContext';
import ImagePanel from '../common/ImagePanel';
import ChecklistTable from './ChecklistTable';
import DropdownSelect from '../common/DropdownSelect';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';

const engineers = ['John Smith', 'Jane Doe', 'Mike Johnson', 'Sarah Williams', 'Tom Brown'];

const defaultEquipmentObservations: Record<string, string[]> = {
  'motor-001': [
    'High vibration detected on bearing',
    'Temperature slightly elevated',
    'Abnormal noise detected'
  ],
  'plc-001': [
    'CPU temperature nominal',
    'No communication errors',
    'All modules responsive'
  ],
  'drive-001': [
    'Output frequency stable',
    'No overcurrent detected',
    'Heat sink temperature normal'
  ],
  'pump-001': [
    'Flow rate within limits',
    'Pressure stable',
    'No cavitation detected'
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

const defaultEquipmentComments: Record<string, string[]> = {
  'motor-001': [
    'More vibrations',
    'Noise from bearings',
    'Motor heated up'
  ],
  'plc-001': [
    'Program execution stable',
    'Watchdog timer normal',
    'No errors detected'
  ],
  'drive-001': [
    'Operating at rated capacity',
    'Cooling system effective',
    'Protection circuits active'
  ],
  'pump-001': [
    'No cavitation issues',
    'Seal condition good',
    'Impeller balanced'
  ]
};

const MainDashboard = () => {
  const { selectedEquipment } = useEquipment();
  const [verifiedBy, setVerifiedBy] = useState<string>('');
  const [confirmedBy, setConfirmedBy] = useState<string>('');
  const [overallStatus, setOverallStatus] = useState<'Good' | 'Bad' | 'Worst'>('Good');
  const [observations, setObservations] = useState<Record<string, string[]>>(() => {
    const saved = localStorage.getItem('dashboardObservations');
    return saved ? JSON.parse(saved) : defaultEquipmentObservations;
  });
  const [comments, setComments] = useState<Record<string, string[]>>(() => {
    const saved = localStorage.getItem('dashboardComments');
    return saved ? JSON.parse(saved) : defaultEquipmentComments;
  });
  const [editingObsIdx, setEditingObsIdx] = useState<number | null>(null);
  const [editingObsText, setEditingObsText] = useState<string>('');
  const [editingComIdx, setEditingComIdx] = useState<number | null>(null);
  const [editingComText, setEditingComText] = useState<string>('');
  const [newObsText, setNewObsText] = useState<string>('');
  const [newComText, setNewComText] = useState<string>('');

  const getStatusClass = () => {
    switch (overallStatus) {
      case 'Good': return 'status-good';
      case 'Bad': return 'status-bad';
      case 'Worst': return 'status-worst';
    }
  };

  const currentEquipmentId = selectedEquipment?.id || 'motor-001';

  const currentObservations = observations[currentEquipmentId] || observations['motor-001'];
  const currentChecklist = selectedEquipment
    ? equipmentChecklists[selectedEquipment.id] || equipmentChecklists['motor-001']
    : equipmentChecklists['motor-001'];
  const currentComments = comments[currentEquipmentId] || comments['motor-001'];

  const saveObservations = (newObs: Record<string, string[]>) => {
    setObservations(newObs);
    localStorage.setItem('dashboardObservations', JSON.stringify(newObs));
  };

  const saveComments = (newCom: Record<string, string[]>) => {
    setComments(newCom);
    localStorage.setItem('dashboardComments', JSON.stringify(newCom));
  };

  const updateObservation = (idx: number, text: string) => {
    const updated = [...currentObservations];
    updated[idx] = text;
    const newObs = { ...observations, [currentEquipmentId]: updated };
    saveObservations(newObs);
    setEditingObsIdx(null);
  };

  const deleteObservation = (idx: number) => {
    const updated = currentObservations.filter((_, i) => i !== idx);
    const newObs = { ...observations, [currentEquipmentId]: updated };
    saveObservations(newObs);
  };

  const addObservation = () => {
    if (newObsText.trim()) {
      const updated = [...currentObservations, newObsText];
      const newObs = { ...observations, [currentEquipmentId]: updated };
      saveObservations(newObs);
      setNewObsText('');
    }
  };

  const updateComment = (idx: number, text: string) => {
    const updated = [...currentComments];
    updated[idx] = text;
    const newCom = { ...comments, [currentEquipmentId]: updated };
    saveComments(newCom);
    setEditingComIdx(null);
  };

  const deleteComment = (idx: number) => {
    const updated = currentComments.filter((_, i) => i !== idx);
    const newCom = { ...comments, [currentEquipmentId]: updated };
    saveComments(newCom);
  };

  const addComment = () => {
    if (newComText.trim()) {
      const updated = [...currentComments, newComText];
      const newCom = { ...comments, [currentEquipmentId]: updated };
      saveComments(newCom);
      setNewComText('');
    }
  };

  useEffect(() => {
    setVerifiedBy('');
    setConfirmedBy('');
    setOverallStatus('Good');
    setEditingObsIdx(null);
    setEditingComIdx(null);
  }, [selectedEquipment?.id]);

  return (
    <div className="grid gap-6 h-full animate-fade-in" style={{ gridTemplateColumns: '1.1fr 0.8fr 1.1fr' }}>
      {/* Left Column: Images (stacked) */}
      <div className="flex flex-col gap-6 h-full min-h-0">
        <div className="flex-1 min-h-0">
          <ImagePanel title="Image Captured During Inspection" images={['/motor1.png']} showUploadButton={true} />
        </div>
        <div className="flex-1 min-h-0">
          <ImagePanel title="Last Image Captured" images={['/motor2.png']} showUploadButton={false} showImageInfo={true} />
        </div>
      </div>

      {/* Middle Column: Checklist Table */}
      <div className="flex flex-col h-full min-h-0 flex-1">
        <ChecklistTable initialItems={currentChecklist} className="h-full" />
      </div>

      {/* Right Column: All cards stacked */}
      <div className="flex flex-col gap-6 h-full min-h-0">
        {/* Top Row: Observations and Overall Status */}
        <div className="grid grid-cols-2 gap-6 flex-1 min-h-0">
          {/* Observations Based on Image Comparison */}
          <div className="bg-card border border-border rounded-lg p-4 overflow-auto min-h-0 flex flex-col">
            <h4 className="text-sm font-medium text-gray-900 mb-3 flex-shrink-0">
              Observations based on image comparison (Old and Latest)
            </h4>
            <ul className="space-y-2 text-sm text-gray-900 flex-1 min-h-0 overflow-y-auto mb-3">
              {currentObservations.map((obs, idx) => (
                <li key={idx} className="flex items-start justify-between gap-2 group">
                  {editingObsIdx === idx ? (
                    <div className="flex gap-2 flex-1">
                      <Input
                        value={editingObsText}
                        onChange={(e) => setEditingObsText(e.target.value)}
                        placeholder="Enter observation"
                        className="text-xs h-8"
                      />
                      <Button size="sm" onClick={() => updateObservation(idx, editingObsText)} className="h-8 px-2">Save</Button>
                      <Button size="sm" variant="ghost" onClick={() => setEditingObsIdx(null)} className="h-8 px-2">Cancel</Button>
                    </div>
                  ) : (
                    <>
                      <span className="flex-1">{idx + 1}. {obs}</span>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 px-2 text-xs"
                          onClick={() => {
                            setEditingObsIdx(idx);
                            setEditingObsText(obs);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 px-2 text-xs text-red-600 hover:text-red-700"
                          onClick={() => deleteObservation(idx)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
            <div className="flex gap-2 mt-2 flex-shrink-0">
              <Input
                placeholder="Add new observation"
                value={newObsText}
                onChange={(e) => setNewObsText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addObservation()}
                className="text-xs h-8"
              />
              <Button size="sm" onClick={addObservation} className="h-8 px-3 flex-shrink-0">
                Add
              </Button>
            </div>
          </div>

          {/* Overall Equipment Status */}
          <div className="bg-card border border-border rounded-lg p-4 flex flex-col justify-between">
            <div>
              <h5 className="text-sm font-medium text-gray-900 mb-3">Overall Equipment Status</h5>
              <div className={`text-center py-2 rounded font-bold text-white mb-2 text-sm ${getStatusClass()}`}>
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

        {/* Middle Row: Last Inspection Date and Observations by Person */}
        <div className="grid grid-cols-2 gap-6 flex-1 min-h-0">
          {/* Last Inspection Date */}
          <div className="bg-card border border-border rounded-lg p-4">
            <h5 className="text-sm font-medium text-gray-900 mb-3">Last Inspection Date</h5>
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

          {/* Observations by Person Checking */}
          <div className="bg-card border border-border rounded-lg p-4 overflow-auto min-h-0 flex flex-col">
            <h4 className="text-sm font-medium text-gray-900 mb-3 flex-shrink-0">
              Observations by person checking
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground flex-1 min-h-0 overflow-y-auto mb-3">
              {currentComments.map((comment, idx) => (
                <li key={idx} className="flex items-start justify-between gap-2 group">
                  {editingComIdx === idx ? (
                    <div className="flex gap-2 flex-1">
                      <Input
                        value={editingComText}
                        onChange={(e) => setEditingComText(e.target.value)}
                        placeholder="Enter observation"
                        className="text-xs h-8"
                      />
                      <Button size="sm" onClick={() => updateComment(idx, editingComText)} className="h-8 px-2">Save</Button>
                      <Button size="sm" variant="ghost" onClick={() => setEditingComIdx(null)} className="h-8 px-2">Cancel</Button>
                    </div>
                  ) : (
                    <>
                      <span className="flex-1">{idx + 1}. {comment}</span>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 px-2 text-xs"
                          onClick={() => {
                            setEditingComIdx(idx);
                            setEditingComText(comment);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 px-2 text-xs text-red-600 hover:text-red-700"
                          onClick={() => deleteComment(idx)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
            <div className="flex gap-2 mt-2 flex-shrink-0">
              <Input
                placeholder="Add new observation"
                value={newComText}
                onChange={(e) => setNewComText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addComment()}
                className="text-xs h-8"
              />
              <Button size="sm" onClick={addComment} className="h-8 px-3 flex-shrink-0">
                Add
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Row: Verified/Confirmed By spanning full width */}
        <div className="bg-card border border-border rounded-lg p-4 flex-shrink-0">
          <div className="grid grid-cols-2 gap-6">
            <DropdownSelect
              label="Verified By"
              options={engineers}
              value={verifiedBy}
              onChange={setVerifiedBy}
              placeholder="Select Name"
            />
            <DropdownSelect
              label="Confirmed By"
              options={engineers}
              value={confirmedBy}
              onChange={setConfirmedBy}
              placeholder="Select Name"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
