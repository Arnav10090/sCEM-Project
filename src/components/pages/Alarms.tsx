import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, RotateCcw, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface AlarmRecord {
  no: string;
  level: string;
  alarmNo: string;
  message: string;
  device: string;
  eventTime: string;
  recoveredTime: string;
}

const generateAlarms = (count: number): AlarmRecord[] => {
  const levels = ['CRITICAL', 'WARNING', 'INFO'];
  const messages = [
    'Motor temperature exceeded threshold',
    'Vibration levels abnormal',
    'High current detected',
    'Safety interlock triggered',
    'Bearing temperature high',
    'Speed deviation detected',
    'Pressure limit exceeded',
    'Flow rate abnormal',
  ];
  const devices = ['MOTOR-01', 'BEARING-DS', 'PUMP-07', 'MOTOR-03', 'SAFETY-01', 'COMP-02'];

  return Array.from({ length: count }, (_, i) => ({
    no: String(i + 1).padStart(4, '0'),
    level: levels[Math.floor(Math.random() * levels.length)],
    alarmNo: `ALM-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
    message: messages[Math.floor(Math.random() * messages.length)],
    device: devices[Math.floor(Math.random() * devices.length)],
    eventTime: `2024/12/${String(Math.floor(Math.random() * 10) + 1).padStart(2, '0')} ${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
    recoveredTime: Math.random() > 0.3 ? `2024/12/${String(Math.floor(Math.random() * 10) + 1).padStart(2, '0')} ${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}` : '-',
  }));
};

const allAlarms = generateAlarms(50);

const Alarms = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState<string>('');
  const [deviceFilter, setDeviceFilter] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const itemsPerPage = 15;

  const uniqueLevels = Array.from(new Set(allAlarms.map(a => a.level)));
  const uniqueDevices = Array.from(new Set(allAlarms.map(a => a.device)));

  const filteredAlarms = allAlarms.filter((alarm) => {
    const matchesSearch =
      alarm.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alarm.device.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alarm.alarmNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = !levelFilter || alarm.level === levelFilter;
    const matchesDevice = !deviceFilter || alarm.device === deviceFilter;

    return matchesSearch && matchesLevel && matchesDevice;
  });

  const totalPages = Math.ceil(filteredAlarms.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedAlarms = filteredAlarms.slice(startIndex, startIndex + itemsPerPage);

  const handleReset = () => {
    setSearchTerm('');
    setLevelFilter('');
    setDeviceFilter('');
    setCurrentPage(1);
    setShowResetDialog(false);
  };

  const isFiltered = searchTerm || levelFilter || deviceFilter;

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Controls */}
      <div className="flex items-center justify-end gap-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search alarms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 w-64"
          />
        </div>
        <Button variant="outline" size="sm" onClick={() => setShowResetDialog(true)}>
          <RotateCcw className="w-4 h-4 mr-1" />
          RESET
        </Button>
      </div>

      {/* Alarm Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <table className="data-table">
          <thead>
            <tr>
              <th className="w-16">NO.</th>
              <th>ALARM LEVEL & No. & MESSAGE</th>
              <th className="w-28">DEVICE</th>
              <th className="w-44">EVENT TIME</th>
              <th className="w-44">RECOVERED TIME</th>
            </tr>
          </thead>
          <tbody>
            {displayedAlarms.map((alarm) => (
              <tr key={alarm.no}>
                <td className="font-mono text-center">{alarm.no}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      alarm.level === 'CRITICAL' ? 'bg-destructive text-destructive-foreground' :
                      alarm.level === 'WARNING' ? 'bg-yellow-500 text-white' :
                      'bg-blue-500 text-white'
                    }`}>
                      {alarm.level}
                    </span>
                    <span className="font-mono text-xs">{alarm.alarmNo}:</span>
                    <span>{alarm.message}</span>
                  </div>
                </td>
                <td className="font-mono">{alarm.device}</td>
                <td className="font-mono text-sm">{alarm.eventTime}</td>
                <td className="font-mono text-sm">{alarm.recoveredTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end gap-2">
        <span className="text-sm text-muted-foreground">PAGE</span>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
        >
          <ChevronsLeft className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <span className="text-sm font-mono px-2">
          {currentPage} / {totalPages}
        </span>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
        >
          <ChevronsRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Reset Confirmation Dialog */}
      <Dialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>RESET</DialogTitle>
            <DialogDescription>
              Are you sure you want to reset the alarm filters?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowResetDialog(false)}>
              NO
            </Button>
            <Button onClick={handleReset}>YES</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Alarms;
