import { useAlarm } from '@/context/AlarmContext';
import { Button } from '@/components/ui/button';
import { X, AlertTriangle } from 'lucide-react';

const AlarmPopup = () => {
  const { pendingAlarms, acknowledgeAlarm, acknowledgeAll } = useAlarm();

  if (pendingAlarms.length === 0) {
    return null;
  }

  const firstAlarm = pendingAlarms[0];
  const hasMultipleAlarms = pendingAlarms.length > 1;

  const getAlarmColor = (level: string) => {
    switch (level) {
      case 'CRITICAL':
        return 'bg-destructive text-destructive-foreground';
      case 'WARNING':
        return 'bg-yellow-500 text-white';
      case 'INFO':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="fixed bottom-32 right-4 w-96 z-40 animate-fade-in">
      {/* Main Alarm Card */}
      <div className="bg-card border-2 border-destructive rounded-lg shadow-lg p-4 mb-2">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex items-start gap-3 flex-1">
            <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${getAlarmColor(firstAlarm.level)}`}>
                  {firstAlarm.level}
                </span>
                {hasMultipleAlarms && (
                  <span className="text-xs font-medium text-muted-foreground">
                    +{pendingAlarms.length - 1} more
                  </span>
                )}
              </div>
              <p className="text-sm font-medium text-foreground mb-1">{firstAlarm.message}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{firstAlarm.device}</span>
                <span>•</span>
                <span>{firstAlarm.eventTime}</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => acknowledgeAlarm(firstAlarm.id)}
            className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 pt-3 border-t border-border">
          <Button
            onClick={() => acknowledgeAlarm(firstAlarm.id)}
            className="flex-1"
            size="sm"
            variant="default"
          >
            Acknowledge
          </Button>
          {hasMultipleAlarms && (
            <Button
              onClick={acknowledgeAll}
              className="flex-1"
              size="sm"
              variant="outline"
            >
              Acknowledge All ({pendingAlarms.length})
            </Button>
          )}
        </div>
      </div>

      {/* Additional Alarms Indicator */}
      {hasMultipleAlarms && (
        <div className="text-xs text-center text-muted-foreground">
          {pendingAlarms.length - 1} more alarm(s) waiting
        </div>
      )}
    </div>
  );
};

export default AlarmPopup;
