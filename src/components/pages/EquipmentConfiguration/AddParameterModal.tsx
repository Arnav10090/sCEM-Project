import { useState, useEffect } from 'react';
import { z } from 'zod';
import { Parameter, commonUnits } from './types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from '@/hooks/use-toast';

const parameterSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters'),
  unit: z.string().trim().min(1, 'Unit is required'),
  dataType: z.enum(['Numeric', 'Boolean', 'Text']),
  lowerThreshold: z.number().nullable(),
  upperThreshold: z.number().nullable(),
  alertPriority: z.enum(['Critical', 'High', 'Medium', 'Low']),
  monitoringEnabled: z.boolean(),
  remarks: z.string().max(200, 'Remarks must be less than 200 characters'),
}).refine((data) => {
  if (data.dataType === 'Numeric') {
    if (data.lowerThreshold !== null && data.upperThreshold !== null) {
      return data.lowerThreshold < data.upperThreshold;
    }
  }
  return true;
}, {
  message: 'Lower threshold must be less than upper threshold',
  path: ['lowerThreshold'],
});

interface AddParameterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (parameter: Omit<Parameter, 'id'>) => void;
  editingParameter?: Parameter | null;
}

const AddParameterModal = ({
  isOpen,
  onClose,
  onSave,
  editingParameter,
}: AddParameterModalProps) => {
  const [name, setName] = useState('');
  const [unit, setUnit] = useState('');
  const [customUnit, setCustomUnit] = useState('');
  const [dataType, setDataType] = useState<'Numeric' | 'Boolean' | 'Text'>('Numeric');
  const [lowerThreshold, setLowerThreshold] = useState('');
  const [upperThreshold, setUpperThreshold] = useState('');
  const [alertPriority, setAlertPriority] = useState<'Critical' | 'High' | 'Medium' | 'Low'>('Medium');
  const [monitoringEnabled, setMonitoringEnabled] = useState(true);
  const [remarks, setRemarks] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (editingParameter) {
      setName(editingParameter.name);
      if (commonUnits.includes(editingParameter.unit)) {
        setUnit(editingParameter.unit);
        setCustomUnit('');
      } else {
        setUnit('custom');
        setCustomUnit(editingParameter.unit);
      }
      setDataType(editingParameter.dataType);
      setLowerThreshold(editingParameter.lowerThreshold?.toString() ?? '');
      setUpperThreshold(editingParameter.upperThreshold?.toString() ?? '');
      setAlertPriority(editingParameter.alertPriority);
      setMonitoringEnabled(editingParameter.monitoringEnabled);
      setRemarks(editingParameter.remarks);
    } else {
      resetForm();
    }
  }, [editingParameter, isOpen]);

  const resetForm = () => {
    setName('');
    setUnit('');
    setCustomUnit('');
    setDataType('Numeric');
    setLowerThreshold('');
    setUpperThreshold('');
    setAlertPriority('Medium');
    setMonitoringEnabled(true);
    setRemarks('');
    setErrors({});
  };

  const handleSave = () => {
    const finalUnit = unit === 'custom' ? customUnit : unit;
    
    const data = {
      name: name.trim(),
      unit: finalUnit,
      dataType,
      lowerThreshold: dataType === 'Numeric' && lowerThreshold ? parseFloat(lowerThreshold) : null,
      upperThreshold: dataType === 'Numeric' && upperThreshold ? parseFloat(upperThreshold) : null,
      alertPriority,
      monitoringEnabled,
      remarks: remarks.trim(),
    };

    const result = parameterSchema.safeParse(data);
    
    if (!result.success) {
      const newErrors: Record<string, string> = {};
      const zodErrors = result.error.issues;
      zodErrors.forEach((err) => {
        if (err.path[0]) {
          newErrors[err.path[0].toString()] = err.message;
        }
      });
      setErrors(newErrors);
      return;
    }

    onSave(data);
    toast({
      title: editingParameter ? 'Parameter Updated' : 'Parameter Added',
      description: `${data.name} has been ${editingParameter ? 'updated' : 'added'} successfully.`,
    });
    onClose();
    resetForm();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-industrial-red">
            {editingParameter ? 'Edit Parameter' : 'Add New Parameter'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Parameter Name */}
          <div className="space-y-2">
            <Label htmlFor="param-name">Parameter Name *</Label>
            <Input
              id="param-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Vibration DS, Temperature"
              className={errors.name ? 'border-destructive' : ''}
            />
            {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
          </div>

          {/* Parameter Unit */}
          <div className="space-y-2">
            <Label>Parameter Unit *</Label>
            <Select value={unit} onValueChange={setUnit}>
              <SelectTrigger className={errors.unit ? 'border-destructive' : ''}>
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                {commonUnits.map((u) => (
                  <SelectItem key={u} value={u}>{u}</SelectItem>
                ))}
                <SelectItem value="custom">Custom...</SelectItem>
              </SelectContent>
            </Select>
            {unit === 'custom' && (
              <Input
                value={customUnit}
                onChange={(e) => setCustomUnit(e.target.value)}
                placeholder="Enter custom unit"
                className="mt-2"
              />
            )}
            {errors.unit && <p className="text-xs text-destructive">{errors.unit}</p>}
          </div>

          {/* Data Type */}
          <div className="space-y-2">
            <Label>Data Type *</Label>
            <RadioGroup
              value={dataType}
              onValueChange={(v) => setDataType(v as typeof dataType)}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Numeric" id="numeric" />
                <Label htmlFor="numeric" className="cursor-pointer">Numeric</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Boolean" id="boolean" />
                <Label htmlFor="boolean" className="cursor-pointer">Boolean</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Text" id="text" />
                <Label htmlFor="text" className="cursor-pointer">Text</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Thresholds (only for Numeric) */}
          {dataType === 'Numeric' && (
            <div className="space-y-2 p-3 bg-muted/50 rounded-lg">
              <Label className="text-sm font-medium">Threshold Values</Label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="lower" className="text-xs text-muted-foreground">Lower Threshold</Label>
                  <Input
                    id="lower"
                    type="number"
                    value={lowerThreshold}
                    onChange={(e) => setLowerThreshold(e.target.value)}
                    placeholder="Min value"
                    className={errors.lowerThreshold ? 'border-destructive' : ''}
                  />
                </div>
                <div>
                  <Label htmlFor="upper" className="text-xs text-muted-foreground">Upper Threshold</Label>
                  <Input
                    id="upper"
                    type="number"
                    value={upperThreshold}
                    onChange={(e) => setUpperThreshold(e.target.value)}
                    placeholder="Max value"
                  />
                </div>
              </div>
              {errors.lowerThreshold && (
                <p className="text-xs text-destructive">{errors.lowerThreshold}</p>
              )}
            </div>
          )}

          {/* Alert Priority */}
          <div className="space-y-2">
            <Label>Alert Priority *</Label>
            <RadioGroup
              value={alertPriority}
              onValueChange={(v) => setAlertPriority(v as typeof alertPriority)}
              className="flex flex-wrap gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Critical" id="critical" />
                <Label htmlFor="critical" className="cursor-pointer text-destructive">Critical</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="High" id="high" />
                <Label htmlFor="high" className="cursor-pointer text-orange-500">High</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Medium" id="medium" />
                <Label htmlFor="medium" className="cursor-pointer text-yellow-600">Medium</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="low" id="low-priority" />
                <Label htmlFor="low-priority" className="cursor-pointer text-muted-foreground">Low</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Enable Monitoring */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="monitoring"
              checked={monitoringEnabled}
              onCheckedChange={(checked) => setMonitoringEnabled(checked === true)}
            />
            <Label htmlFor="monitoring" className="cursor-pointer">
              Enable real-time monitoring for this parameter
            </Label>
          </div>

          {/* Remarks */}
          <div className="space-y-2">
            <Label htmlFor="remarks">Remarks / Notes</Label>
            <Textarea
              id="remarks"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Optional notes about this parameter"
              rows={2}
              className={errors.remarks ? 'border-destructive' : ''}
            />
            {errors.remarks && <p className="text-xs text-destructive">{errors.remarks}</p>}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>
            {editingParameter ? 'Update Parameter' : 'Save Parameter'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddParameterModal;
