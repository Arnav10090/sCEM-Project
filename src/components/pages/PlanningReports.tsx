import { useState } from 'react';
import { Camera, Search, RotateCcw, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface InspectionRecord {
  sn: number;
  plant: string;
  equipment: string;
  criticalLevel: string;
  lastInspectionDate: string;
  plannedInspectionDate: string;
  lastObservation: string;
  status: 'Done' | 'Not Done';
  remarks: string;
}

const inspectionRecords: InspectionRecord[] = [
  {
    sn: 1,
    plant: 'RCM-1',
    equipment: 'Main Motor',
    criticalLevel: 'Most critical',
    lastInspectionDate: '12/01/2024',
    plannedInspectionDate: '12/15/2024',
    lastObservation: '1. Noise from DS bearing area.',
    status: 'Done',
    remarks: '',
  },
  {
    sn: 2,
    plant: 'RCM-1',
    equipment: 'Main Motor',
    criticalLevel: 'Most critical',
    lastInspectionDate: '11/15/2024',
    plannedInspectionDate: '12/01/2024',
    lastObservation: '1. Temperature was normal',
    status: 'Done',
    remarks: '',
  },
  {
    sn: 3,
    plant: 'RCM-2',
    equipment: 'Pump #3',
    criticalLevel: 'Critical',
    lastInspectionDate: '11/20/2024',
    plannedInspectionDate: '12/10/2024',
    lastObservation: '1. Vibration levels normal',
    status: 'Not Done',
    remarks: '',
  },
  {
    sn: 4,
    plant: 'RCM-2',
    equipment: 'Compressor',
    criticalLevel: 'Medium',
    lastInspectionDate: '11/25/2024',
    plannedInspectionDate: '12/20/2024',
    lastObservation: '',
    status: 'Not Done',
    remarks: '',
  },
  {
    sn: 5,
    plant: 'RCM-3',
    equipment: 'Conveyor Belt',
    criticalLevel: 'Low',
    lastInspectionDate: '11/10/2024',
    plannedInspectionDate: '12/25/2024',
    lastObservation: '',
    status: 'Not Done',
    remarks: '',
  },
];

const PlanningReports = () => {
  return (
    <div className="animate-fade-in">
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <table className="data-table">
          <thead>
            <tr>
              <th className="w-12">S.N</th>
              <th className="w-20">Plant</th>
              <th className="w-28">Equipment</th>
              <th className="w-32">Critical level for process</th>
              <th className="w-32">Last Inspection Date</th>
              <th className="w-32">Planned Inspection Date</th>
              <th>Last Inspection Observation with image</th>
              <th className="w-28">Status of Inspection</th>
              <th className="w-24">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {inspectionRecords.map((record) => (
              <tr key={record.sn}>
                <td className="text-center">{record.sn}</td>
                <td>{record.plant}</td>
                <td>{record.equipment}</td>
                <td className="text-industrial-red font-medium">{record.criticalLevel}</td>
                <td className="font-mono">{record.lastInspectionDate}</td>
                <td className="font-mono">{record.plannedInspectionDate}</td>
                <td>
                  <div className="flex items-start gap-3">
                    <span className="text-industrial-red flex-1">{record.lastObservation || '-'}</span>
                    {record.lastObservation && (
                      <div className="w-16 h-12 bg-muted border border-border rounded flex items-center justify-center flex-shrink-0">
                        <Camera className="w-4 h-4 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                </td>
                <td>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    record.status === 'Done' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {record.status}
                  </span>
                </td>
                <td>{record.remarks || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlanningReports;
