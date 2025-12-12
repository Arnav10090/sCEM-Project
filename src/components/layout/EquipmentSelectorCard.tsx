import { useEquipment } from '@/context/EquipmentContext';

const EquipmentSelectorCard = () => {
  const { selectedEquipment, equipmentList, handleEquipmentChange } = useEquipment();

  return (
    <div className="kpi-card">
      <span className="kpi-label">Equipment</span>
      
      <select 
        value={selectedEquipment?.id || ''} 
        onChange={(e) => handleEquipmentChange(e.target.value)}
        className="w-full px-3 py-2 border border-border rounded bg-white text-sm font-medium hover:bg-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
      >
        <option value="" disabled>Select Equipment</option>
        {equipmentList.map(equipment => (
          <option key={equipment.id} value={equipment.id}>
            {equipment.icon} {equipment.name}
          </option>
        ))}
      </select>

      {selectedEquipment && (
        <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
          <span className="text-lg">{selectedEquipment.icon}</span>
          <span>Active Equipment</span>
        </div>
      )}
    </div>
  );
};

export default EquipmentSelectorCard;
