import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';

interface ChecklistItem {
  id: string;
  parameter: string;
  isChecked: boolean;
  comment: string;
}

interface ChecklistTableProps {
  equipmentType?: string;
  initialItems?: ChecklistItem[];
  className?: string;
}

const defaultChecklist: ChecklistItem[] = [
  { id: '1', parameter: 'Temperature of Bearing', isChecked: false, comment: '' },
  { id: '2', parameter: 'Vibration in Motor', isChecked: false, comment: '' },
  { id: '3', parameter: 'Physical - Dust', isChecked: false, comment: '' },
  { id: '4', parameter: 'Overall status', isChecked: false, comment: '' },
];

const ChecklistTable = ({ initialItems = defaultChecklist, className = '' }: ChecklistTableProps) => {
  const [checklist, setChecklist] = useState<ChecklistItem[]>(initialItems);

  const handleCheckChange = (id: string) => {
    setChecklist(prev =>
      prev.map(item =>
        item.id === id ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  };

  const handleCommentChange = (id: string, comment: string) => {
    setChecklist(prev =>
      prev.map(item =>
        item.id === id ? { ...item, comment } : item
      )
    );
  };

  return (
    <div className={`bg-card border border-border rounded-lg overflow-hidden flex flex-col ${className || 'h-full'}`}>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-muted border-b border-border">
            <th className="text-left px-3 py-2 text-xs font-medium text-industrial-red border-r border-border">
              Various parameters of equipment ex.
            </th>
            <th className="text-center px-3 py-2 text-xs font-medium text-industrial-red border-r border-border w-20">
              Status in Checked/Not-Checked to be displayed
            </th>
            <th className="text-left px-3 py-2 text-xs font-medium text-industrial-red">
              Add comments during inspection ex.
            </th>
          </tr>
        </thead>
        <tbody>
          {checklist.map((item, index) => (
            <tr key={item.id} className="border-b border-border hover:bg-muted/30 transition-colors align-top h-24">
              <td className="px-3 py-3 text-xs text-industrial-red border-r border-border">
                {item.parameter}
              </td>
              <td className="px-3 py-3 text-center border-r border-border align-middle">
                <div className="flex items-center justify-center h-full">
                  <Checkbox
                    checked={item.isChecked}
                    onCheckedChange={() => handleCheckChange(item.id)}
                    className="h-4 w-4"
                  />
                </div>
              </td>
              <td className="px-3 py-3">
                <textarea
                  value={item.comment}
                  onChange={(e) => handleCommentChange(item.id, e.target.value)}
                  placeholder="Add comment..."
                  rows={3}
                  className="w-full px-2 py-1 text-xs border border-border rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 text-industrial-red placeholder-muted-foreground resize-none"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChecklistTable;
