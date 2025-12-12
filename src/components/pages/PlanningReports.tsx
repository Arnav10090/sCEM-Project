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
import { DateRangeFilter } from '@/components/common/DateRangeFilter';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [plantFilter, setPlantFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [fromLastInspectionDate, setFromLastInspectionDate] = useState<string>('');
  const [toLastInspectionDate, setToLastInspectionDate] = useState<string>('');
  const [fromPlannedDate, setFromPlannedDate] = useState<string>('');
  const [toPlannedDate, setToPlannedDate] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const rowsPerPageOptions = [5, 15, 25, 50];

  const uniquePlants = Array.from(new Set(inspectionRecords.map(r => r.plant)));
  const uniqueStatuses = Array.from(new Set(inspectionRecords.map(r => r.status)));

  const filteredRecords = inspectionRecords.filter((record) => {
    const matchesSearch =
      record.equipment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.plant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.lastObservation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlant = !plantFilter || record.plant === plantFilter;
    const matchesStatus = !statusFilter || record.status === statusFilter;

    let matchesLastInspectionDateRange = true;
    const lastInspDate = record.lastInspectionDate.split('/').reverse().join('-');
    if (fromLastInspectionDate && lastInspDate < fromLastInspectionDate) matchesLastInspectionDateRange = false;
    if (toLastInspectionDate && lastInspDate > toLastInspectionDate) matchesLastInspectionDateRange = false;

    let matchesPlannedDateRange = true;
    const plannedInspDate = record.plannedInspectionDate.split('/').reverse().join('-');
    if (fromPlannedDate && plannedInspDate < fromPlannedDate) matchesPlannedDateRange = false;
    if (toPlannedDate && plannedInspDate > toPlannedDate) matchesPlannedDateRange = false;

    return matchesSearch && matchesPlant && matchesStatus && matchesLastInspectionDateRange && matchesPlannedDateRange;
  });

  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedRecords = filteredRecords.slice(startIndex, startIndex + itemsPerPage);

  const handleReset = () => {
    setSearchTerm('');
    setPlantFilter('');
    setStatusFilter('');
    setFromLastInspectionDate('');
    setToLastInspectionDate('');
    setFromPlannedDate('');
    setToPlannedDate('');
    setCurrentPage(1);
    setShowResetDialog(false);
  };

  const isFiltered = searchTerm || plantFilter || statusFilter || fromLastInspectionDate || toLastInspectionDate || fromPlannedDate || toPlannedDate;

  return (
    <div className="space-y-4 animate-fade-in mt-14">
      {/* Controls */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2 flex-1 flex-wrap">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>

          <Select value={plantFilter} onValueChange={setPlantFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by Plant" />
            </SelectTrigger>
            <SelectContent>
              {uniquePlants.map(plant => (
                <SelectItem key={plant} value={plant}>{plant}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              {uniqueStatuses.map(status => (
                <SelectItem key={status} value={status}>{status}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <DateRangeFilter
            label="Inspection Date - Last:"
            fromDate={fromLastInspectionDate}
            toDate={toLastInspectionDate}
            onFromDateChange={(date) => {
              setFromLastInspectionDate(date);
              setCurrentPage(1);
            }}
            onToDateChange={(date) => {
              setToLastInspectionDate(date);
              setCurrentPage(1);
            }}
          />

          <DateRangeFilter
            label="Inspection Date - Planned:"
            fromDate={fromPlannedDate}
            toDate={toPlannedDate}
            onFromDateChange={(date) => {
              setFromPlannedDate(date);
              setCurrentPage(1);
            }}
            onToDateChange={(date) => {
              setToPlannedDate(date);
              setCurrentPage(1);
            }}
          />

          {isFiltered && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchTerm('');
                setPlantFilter('');
                setStatusFilter('');
                setFromLastInspectionDate('');
                setToLastInspectionDate('');
                setFromPlannedDate('');
                setToPlannedDate('');
                setCurrentPage(1);
              }}
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>

        <Button variant="outline" size="sm" onClick={() => setShowResetDialog(true)}>
          <RotateCcw className="w-4 h-4 mr-1" />
          RESET
        </Button>
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

          {plantFilter && (
            <div className="inline-flex items-center gap-2 px-2 py-1 bg-background border border-input rounded-full text-xs">
              <span>Plant: {plantFilter}</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 ml-1"
                onClick={() => {
                  setPlantFilter('');
                  setCurrentPage(1);
                }}
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          )}

          {statusFilter && (
            <div className="inline-flex items-center gap-2 px-2 py-1 bg-background border border-input rounded-full text-xs">
              <span>Status: {statusFilter}</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 ml-1"
                onClick={() => {
                  setStatusFilter('');
                  setCurrentPage(1);
                }}
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          )}

          {(fromLastInspectionDate || toLastInspectionDate) && (
            <div className="inline-flex items-center gap-2 px-2 py-1 bg-background border border-input rounded-full text-xs">
              <span>Last Inspection: {fromLastInspectionDate} to {toLastInspectionDate}</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 ml-1"
                onClick={() => {
                  setFromLastInspectionDate('');
                  setToLastInspectionDate('');
                  setCurrentPage(1);
                }}
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          )}

          {(fromPlannedDate || toPlannedDate) && (
            <div className="inline-flex items-center gap-2 px-2 py-1 bg-background border border-input rounded-full text-xs">
              <span>Planned Inspection: {fromPlannedDate} to {toPlannedDate}</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 ml-1"
                onClick={() => {
                  setFromPlannedDate('');
                  setToPlannedDate('');
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
            onClick={() => handleReset()}
          >
            Clear All
          </Button>
        </div>
      )}

      {/* Table */}
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
            {displayedRecords.map((record) => (
              <tr key={record.sn}>
                <td className="text-center">{record.sn}</td>
                <td>{record.plant}</td>
                <td>{record.equipment}</td>
                <td className="text-industrial-red font-medium">{record.criticalLevel}</td>
                <td className="font-mono">{record.lastInspectionDate}</td>
                <td className="font-mono">{record.plannedInspectionDate}</td>
                <td>
                  <div className="flex flex-col items-start gap-2">
                    <span className="text-industrial-red">{record.lastObservation || '-'}</span>
                    {record.lastObservation && (
                      <div className="w-24 h-16 bg-muted border border-border rounded flex items-center justify-center">
                        {record.sn === 1 ? (
                          <img src="/image.png" alt="Inspection observation" className="w-full h-full object-contain rounded" />
                        ) : record.sn === 2 ? (
                          <img src="/image2.png" alt="Inspection observation" className="w-full h-full object-contain rounded" />
                        ) : (
                          <Camera className="w-4 h-4 text-muted-foreground" />
                        )}
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

      {/* Reset Confirmation Dialog */}
      <Dialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>RESET</DialogTitle>
            <DialogDescription>
              Are you sure you want to reset the filters?
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

export default PlanningReports;
