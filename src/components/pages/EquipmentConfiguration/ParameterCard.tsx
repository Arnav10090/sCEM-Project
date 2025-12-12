import { useState } from 'react';
import { ChevronDown, ChevronUp, Pencil, X, Activity } from 'lucide-react';
import { Parameter } from './types';
import { Button } from '@/components/ui/button';

interface ParameterCardProps {
  parameter: Parameter;
  index: number;
  onEdit: () => void;
  onDelete: () => void;
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'Critical':
      return 'bg-destructive text-destructive-foreground';
    case 'High':
      return 'bg-orange-500 text-white';
    case 'Medium':
      return 'bg-yellow-500 text-white';
    case 'Low':
      return 'bg-muted text-muted-foreground';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

const ParameterCard = ({ parameter, index, onEdit, onDelete }: ParameterCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-card">
      {/* Header */}
      <div
        className="flex items-center justify-between p-3 cursor-pointer hover:bg-muted/50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-muted-foreground">
            Parameter {index + 1}:
          </span>
          <span className="font-medium text-foreground">{parameter.name}</span>
          <span className={`px-2 py-0.5 rounded text-xs font-medium ${getPriorityColor(parameter.alertPriority)}`}>
            {parameter.alertPriority}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-7"
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
          >
            <Pencil className="w-3 h-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-destructive hover:text-destructive"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            <X className="w-4 h-4" />
          </Button>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          )}
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="p-3 pt-0 border-t border-border bg-muted/20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground block text-xs">Unit</span>
              <span className="font-medium">{parameter.unit}</span>
            </div>
            {parameter.dataType === 'Numeric' && (
              <>
                <div>
                  <span className="text-muted-foreground block text-xs">Lower Threshold</span>
                  <span className="font-medium font-mono">{parameter.lowerThreshold ?? '-'}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-xs">Upper Threshold</span>
                  <span className="font-medium font-mono">{parameter.upperThreshold ?? '-'}</span>
                </div>
              </>
            )}
            <div>
              <span className="text-muted-foreground block text-xs">Data Type</span>
              <span className="font-medium">{parameter.dataType}</span>
            </div>
            <div>
              <span className="text-muted-foreground block text-xs">Monitoring</span>
              <span className="flex items-center gap-1">
                {parameter.monitoringEnabled ? (
                  <>
                    <Activity className="w-3 h-3 text-primary" />
                    <span className="text-primary font-medium">Enabled</span>
                  </>
                ) : (
                  <span className="text-muted-foreground">Disabled</span>
                )}
              </span>
            </div>
            {parameter.remarks && (
              <div className="col-span-2 md:col-span-4">
                <span className="text-muted-foreground block text-xs">Remarks</span>
                <span className="text-sm">{parameter.remarks}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ParameterCard;
