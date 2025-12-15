import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, X } from 'lucide-react';
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
import { DateRangeFilter } from '@/components/common/DateRangeFilter';
import { useAlarm } from '@/context/AlarmContext';

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
  const { archivedAlarms } = useAlarm();
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState<string>('');
  const [deviceFilter, setDeviceFilter] = useState<string>('');
  const [fromEventTime, setFromEventTime] = useState<string>('');
  const [toEventTime, setToEventTime] = useState<string>('');
  const [fromRecoveredTime, setFromRecoveredTime] = useState<string>('');
  const [toRecoveredTime, setToRecoveredTime] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const rowsPerPageOptions = [5, 15, 25, 50];

  const combinedAlarms = [
    ...archivedAlarms.map((alarm) => ({
      no: alarm.id,
      level: alarm.level,
      alarmNo: alarm.id.substring(0, 8),
      message: alarm.message,
      device: alarm.device,
      eventTime: alarm.eventTime,
      recoveredTime: alarm.acknowledgedTime || '-',
    })),
    ...allAlarms
  ];

  const uniqueLevels = Array.from(new Set(combinedAlarms.map(a => a.level)));
  const uniqueDevices = Array.from(new Set(combinedAlarms.map(a => a.device)));

  const filteredAlarms = combinedAlarms.filter((alarm) => {
    const matchesSearch =
      alarm.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alarm.device.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alarm.alarmNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = !levelFilter || alarm.level === levelFilter;
    const matchesDevice = !deviceFilter || alarm.device === deviceFilter;

    let matchesEventTimeRange = true;
    const eventDate = alarm.eventTime.split(' ')[0];
    if (fromEventTime && eventDate < fromEventTime) matchesEventTimeRange = false;
    if (toEventTime && eventDate > toEventTime) matchesEventTimeRange = false;

    let matchesRecoveredTimeRange = true;
    if (alarm.recoveredTime !== '-') {
      const recoveredDate = alarm.recoveredTime.split(' ')[0];
      if (fromRecoveredTime && recoveredDate < fromRecoveredTime) matchesRecoveredTimeRange = false;
      if (toRecoveredTime && recoveredDate > toRecoveredTime) matchesRecoveredTimeRange = false;
    }

    return matchesSearch && matchesLevel && matchesDevice && matchesEventTimeRange && matchesRecoveredTimeRange;
  });

  const totalPages = Math.ceil(filteredAlarms.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedAlarms = filteredAlarms.slice(startIndex, startIndex + itemsPerPage);

  const isFiltered = searchTerm || levelFilter || deviceFilter || fromEventTime || toEventTime || fromRecoveredTime || toRecoveredTime;

  return (
    <div className="space-y-4 animate-fade-in mt-14">
      {/* Controls */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-1">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search alarms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>

          <Select value={levelFilter} onValueChange={setLevelFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by Level" />
            </SelectTrigger>
            <SelectContent>
              {uniqueLevels.map(level => (
                <SelectItem key={level} value={level}>{level}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={deviceFilter} onValueChange={setDeviceFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by Device" />
            </SelectTrigger>
            <SelectContent>
              {uniqueDevices.map(device => (
                <SelectItem key={device} value={device}>{device}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <DateRangeFilter
            label="Event Time:"
            fromDate={fromEventTime}
            toDate={toEventTime}
            onFromDateChange={(date) => {
              setFromEventTime(date);
              setCurrentPage(1);
            }}
            onToDateChange={(date) => {
              setToEventTime(date);
              setCurrentPage(1);
            }}
          />

          <DateRangeFilter
            label="Recovered Time:"
            fromDate={fromRecoveredTime}
            toDate={toRecoveredTime}
            onFromDateChange={(date) => {
              setFromRecoveredTime(date);
              setCurrentPage(1);
            }}
            onToDateChange={(date) => {
              setToRecoveredTime(date);
              setCurrentPage(1);
            }}
          />

          {isFiltered && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchTerm('');
                setLevelFilter('');
                setDeviceFilter('');
                setFromEventTime('');
                setToEventTime('');
                setFromRecoveredTime('');
                setToRecoveredTime('');
                setCurrentPage(1);
              }}
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>

      </div>

      {/* Applied Filters */}
      {isFiltered && (
        <div className="flex flex-wrap items-center gap-2 p-3 bg-muted rounded-lg border border-border">
          <span className="text-xs font-medium text-muted-foreground">Applied Filters:</span>

          {searchTerm && (
            <div className="inline-flex items-center gap-2 px-2 py-1 bg-background border border-input rounded-full text-xs">
              <span>Search: {searchTerm}</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 ml-1"
                onClick={() => {
                  setSearchTerm('');
                  setCurrentPage(1);
                }}
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          )}

          {levelFilter && (
            <div className="inline-flex items-center gap-2 px-2 py-1 bg-background border border-input rounded-full text-xs">
              <span>Level: {levelFilter}</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 ml-1"
                onClick={() => {
                  setLevelFilter('');
                  setCurrentPage(1);
                }}
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          )}

          {deviceFilter && (
            <div className="inline-flex items-center gap-2 px-2 py-1 bg-background border border-input rounded-full text-xs">
              <span>Device: {deviceFilter}</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 ml-1"
                onClick={() => {
                  setDeviceFilter('');
                  setCurrentPage(1);
                }}
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          )}

          {(fromEventTime || toEventTime) && (
            <div className="inline-flex items-center gap-2 px-2 py-1 bg-background border border-input rounded-full text-xs">
              <span>Event Time: {fromEventTime} to {toEventTime}</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 ml-1"
                onClick={() => {
                  setFromEventTime('');
                  setToEventTime('');
                  setCurrentPage(1);
                }}
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          )}

          {(fromRecoveredTime || toRecoveredTime) && (
            <div className="inline-flex items-center gap-2 px-2 py-1 bg-background border border-input rounded-full text-xs">
              <span>Recovered Time: {fromRecoveredTime} to {toRecoveredTime}</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 ml-1"
                onClick={() => {
                  setFromRecoveredTime('');
                  setToRecoveredTime('');
                  setCurrentPage(1);
                }}
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          )}

          <Button
            variant="ghost"
            size="sm"
            className="text-xs ml-2"
            onClick={() => {
              setSearchTerm('');
              setLevelFilter('');
              setDeviceFilter('');
              setFromEventTime('');
              setToEventTime('');
              setFromRecoveredTime('');
              setToRecoveredTime('');
              setCurrentPage(1);
            }}
          >
            Clear All
          </Button>
        </div>
      )}

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
                <td className="font-mono text-center text-black">{alarm.no}</td>
                <td className="text-center text-black">
                  <div className="flex items-center gap-2 justify-center">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      alarm.level === 'CRITICAL' ? 'bg-destructive text-destructive-foreground' :
                      alarm.level === 'WARNING' ? 'bg-yellow-500 text-white' :
                      'bg-blue-500 text-white'
                    }`}>
                      {alarm.level}
                    </span>
                    <span className="font-mono text-xs text-black">{alarm.alarmNo}:</span>
                    <span className="text-black">{alarm.message}</span>
                  </div>
                </td>
                <td className="font-mono text-center text-black">{alarm.device}</td>
                <td className="font-mono text-sm text-center text-black">{alarm.eventTime}</td>
                <td className="font-mono text-sm text-center text-black">{alarm.recoveredTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Rows Per Page and Pagination */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm text-muted-foreground">Rows per page:</label>
          <Select value={itemsPerPage.toString()} onValueChange={(value) => {
            setItemsPerPage(parseInt(value));
            setCurrentPage(1);
          }}>
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {rowsPerPageOptions.map(option => (
                <SelectItem key={option} value={option.toString()}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
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
      </div>

    </div>
  );
};

export default Alarms;
