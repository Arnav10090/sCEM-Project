import { useEquipment } from '@/context/EquipmentContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const EquipmentSelectorCard = () => {
  const { selectedEquipment, equipmentList, handleEquipmentChange } = useEquipment();

  return (
    <div className="kpi-card">
      <span className="kpi-label">Equipment</span>

      <Select value={selectedEquipment?.id || ''} onValueChange={handleEquipmentChange}>
        <SelectTrigger className="w-full h-auto py-2">
          <SelectValue placeholder="Select Equipment" />
        </SelectTrigger>
        <SelectContent>
          {equipmentList.map(equipment => (
            <SelectItem key={equipment.id} value={equipment.id}>
              <div className="flex items-center gap-2">
                <span className="text-base">{equipment.icon}</span>
                <span>{equipment.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedEquipment && (
        <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
        </div>
      )}
    </div>
  );
};

export default EquipmentSelectorCard;
