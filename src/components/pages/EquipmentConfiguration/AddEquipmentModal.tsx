import { useState, useEffect } from 'react';
import { z } from 'zod';
import { Equipment, equipmentTypes } from './types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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

const equipmentSchema = z.object({
  name: z.string().trim().min(3, 'Name must be at least 3 characters').max(50, 'Name must be less than 50 characters'),
  type: z.string().min(1, 'Equipment type is required'),
  criticalityLevel: z.enum(['Most critical', 'High', 'Medium', 'Low']),
  description: z.string().max(200, 'Description must be less than 200 characters'),
});

interface AddEquipmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (equipment: Omit<Equipment, 'id' | 'parameters' | 'lastUpdated' | 'status'>) => void;
  editingEquipment?: Equipment | null;
  existingNames: string[];
}

const AddEquipmentModal = ({
  isOpen,
  onClose,
  onSave,
  editingEquipment,
  existingNames,
}: AddEquipmentModalProps) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [criticalityLevel, setCriticalityLevel] = useState<'Most critical' | 'High' | 'Medium' | 'Low'>('High');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (editingEquipment) {
      setName(editingEquipment.name);
      setType(editingEquipment.type);
      setCriticalityLevel(editingEquipment.criticalityLevel);
      setDescription(editingEquipment.description);
    } else {
      resetForm();
    }
  }, [editingEquipment, isOpen]);

  const resetForm = () => {
    setName('');
    setType('');
    setCriticalityLevel('High');
    setDescription('');
    setErrors({});
  };

  const handleSave = () => {
    const data = {
      name: name.trim(),
      type,
      criticalityLevel,
      description: description.trim(),
    };

    const result = equipmentSchema.safeParse(data);
    
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

    // Check for duplicate names
    const otherNames = editingEquipment 
      ? existingNames.filter(n => n !== editingEquipment.name)
      : existingNames;
    
    if (otherNames.includes(data.name)) {
      setErrors({ name: 'Equipment with this name already exists' });
      return;
    }

    onSave(data);
    toast({
      title: editingEquipment ? 'Equipment Updated' : 'Equipment Added',
      description: `${data.name} has been ${editingEquipment ? 'updated' : 'added'} successfully.`,
    });
    onClose();
    resetForm();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-industrial-red">
            {editingEquipment ? 'Edit Equipment' : 'Add New Equipment'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Equipment Name */}
          <div className="space-y-2">
            <Label htmlFor="equip-name">Equipment Name *</Label>
            <Input
              id="equip-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Motor, PLC, Drive"
              className={errors.name ? 'border-destructive' : ''}
            />
            {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
          </div>

          {/* Equipment Type */}
          <div className="space-y-2">
            <Label>Equipment Type *</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger className={errors.type ? 'border-destructive' : ''}>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {equipmentTypes.map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.type && <p className="text-xs text-destructive">{errors.type}</p>}
          </div>

          {/* Criticality Level */}
          <div className="space-y-2">
            <Label>Criticality Level *</Label>
            <RadioGroup
              value={criticalityLevel}
              onValueChange={(v) => setCriticalityLevel(v as typeof criticalityLevel)}
              className="flex flex-wrap gap-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Most critical" id="most-critical" />
                <Label htmlFor="most-critical" className="cursor-pointer text-destructive text-sm">
                  Most Critical
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="High" id="high-crit" />
                <Label htmlFor="high-crit" className="cursor-pointer text-orange-500 text-sm">High</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Medium" id="medium-crit" />
                <Label htmlFor="medium-crit" className="cursor-pointer text-yellow-600 text-sm">Medium</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Low" id="low-crit" />
                <Label htmlFor="low-crit" className="cursor-pointer text-muted-foreground text-sm">Low</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of the equipment"
              rows={3}
              className={errors.description ? 'border-destructive' : ''}
            />
            {errors.description && <p className="text-xs text-destructive">{errors.description}</p>}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>
            {editingEquipment ? 'Update Equipment' : 'Save Equipment'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddEquipmentModal;
