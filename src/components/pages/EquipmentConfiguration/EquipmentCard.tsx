import { Wrench, Cpu, Zap, Pencil, Trash2 } from 'lucide-react';
import { Equipment } from './types';
import { Button } from '@/components/ui/button';

interface EquipmentCardProps {
  equipment: Equipment;
  isSelected: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const getEquipmentIcon = (type: string) => {
  switch (type) {
    case 'Rotating Machinery':
      return <Wrench className="w-5 h-5" />;
    case 'Electrical':
      return <Zap className="w-5 h-5" />;
    default:
      return <Cpu className="w-5 h-5" />;
  }
};

const EquipmentCard = ({
  equipment,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
}: EquipmentCardProps) => {
  return (
    <div
      onClick={onSelect}
      className={`group p-3 rounded-lg border cursor-pointer transition-all ${
        isSelected
          ? 'border-l-4 border-l-primary bg-primary/5 border-border'
          : 'border-border hover:shadow-md hover:border-primary/30'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className="text-muted-foreground">
            {getEquipmentIcon(equipment.type)}
          </div>
          <div>
            <h4 className="font-medium text-foreground">{equipment.name}</h4>
            <p className="text-xs text-muted-foreground">
              Parameters: {equipment.parameters.length}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <span
            className={`w-2 h-2 rounded-full ${
              equipment.status === 'Active' ? 'bg-primary' : 'bg-destructive'
            }`}
          />
          <span className="text-xs text-muted-foreground">{equipment.status}</span>
        </div>
      </div>

      <div className="flex gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="outline"
          size="sm"
          className="h-7 text-xs"
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
        >
          <Pencil className="w-3 h-3 mr-1" />
          Edit
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="h-7 text-xs text-destructive hover:bg-destructive hover:text-destructive-foreground"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <Trash2 className="w-3 h-3 mr-1" />
          Delete
        </Button>
      </div>
    </div>
  );
};

export default EquipmentCard;
