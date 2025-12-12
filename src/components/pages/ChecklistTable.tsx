import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

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
  {
    id: "1",
    parameter: "Temperature of Bearing",
    isChecked: false,
    comment: "",
  },
  { id: "2", parameter: "Vibration in Motor", isChecked: false, comment: "" },
  { id: "3", parameter: "Physical - Dust", isChecked: false, comment: "" },
  { id: "4", parameter: "Overall status", isChecked: false, comment: "" },
];

const ChecklistTable = ({
  initialItems = defaultChecklist,
  className = "",
}: ChecklistTableProps) => {
  const [checklist, setChecklist] = useState<ChecklistItem[]>(initialItems);

  const handleCheckChange = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  };

  const handleCommentChange = (id: string, comment: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, comment } : item))
    );
  };

  return (
    <div
      className={`bg-card border border-border rounded-lg overflow-hidden flex flex-col ${
        className || "h-full"
      }`}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <div className="overflow-auto flex-1 min-h-0">
          <table className="w-full border-collapse">
            <thead className="sticky top-0 bg-muted">
              <tr className="border-b border-border">
                <th className="text-left px-3 py-2 text-xs font-medium text-industrial-red border-r border-border w-1/3">
                  Various parameters of equipment ex.
                </th>
                <th className="text-center px-3 py-2 text-xs font-medium text-industrial-red border-r border-border w-20">
                  Status in Checked/Not-Checked to be displayed
                </th>
                <th className="text-left px-3 py-2 text-xs font-medium text-industrial-red flex-1">
                  Add comments during inspection ex.
                </th>
              </tr>
            </thead>
            <tbody>
              {checklist.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-border hover:bg-muted/30 transition-colors align-top h-24"
                >
                  <td className="px-3 py-3 text-xs text-industrial-red border-r border-border w-1/3">
                    {item.parameter}
                  </td>
                  <td className="px-3 py-3 text-center border-r border-border align-middle w-20">
                    <div className="flex items-center justify-center h-full">
                      <Checkbox
                        checked={item.isChecked}
                        onCheckedChange={() => handleCheckChange(item.id)}
                        className="h-4 w-4"
                      />
                    </div>
                  </td>
                  <td className="px-3 py-5 flex-1">
                    <textarea
                      value={item.comment}
                      onChange={(e) =>
                        handleCommentChange(item.id, e.target.value)
                      }
                      placeholder="Add comment..."
                      rows={3}
                      className="w-full px-2 py-2 text-xs border border-border rounded bg-background 
focus:outline-none focus:ring-2 focus:ring-primary/20 text-industrial-red 
placeholder-muted-foreground resize-none h-16"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ChecklistTable;
