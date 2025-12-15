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
        return 'bg-destructive text-destructive-foreground border-destructive';
      case 'WARNING':
        return 'bg-yellow-500 text-white border-yellow-600';
      case 'INFO':
        return 'bg-blue-500 text-white border-blue-600';
      default:
        return 'bg-gray-500 text-white border-gray-600';
    }
  };

  const getBgColor = (level: string) => {
    switch (level) {
      case 'CRITICAL':
        return 'bg-red-50';
      case 'WARNING':
        return 'bg-yellow-50';
      case 'INFO':
        return 'bg-blue-50';
      default:
        return 'bg-gray-50';
    }
  };

  return (
    <>
      {/* Backdrop with blur */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 animate-fade-in"
        onClick={() => acknowledgeAlarm(firstAlarm.id)}
      />

      {/* Centered Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
        <div className="pointer-events-auto w-full max-w-md animate-fade-in">
          {/* Main Alarm Card */}
          <div className={`${getBgColor(firstAlarm.level)} border-2 ${getAlarmColor(firstAlarm.level)} rounded-lg shadow-2xl p-6`}>
            <div className="flex items-start gap-4 mb-4">
              <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-3 py-1 rounded text-sm font-bold ${getAlarmColor(firstAlarm.level)}`}>
                    {firstAlarm.level}
                  </span>
                  {hasMultipleAlarms && (
                    <span className="text-sm font-medium text-muted-foreground">
                      +{pendingAlarms.length - 1} more pending
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{firstAlarm.message}</h3>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="font-medium">{firstAlarm.device}</span>
                  <span>•</span>
                  <span>{firstAlarm.eventTime}</span>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4 border-t border-border">
              <Button
                onClick={() => acknowledgeAlarm(firstAlarm.id)}
                className="flex-1"
                size="lg"
                variant="default"
              >
                Acknowledge
              </Button>
              {hasMultipleAlarms && (
                <Button
                  onClick={acknowledgeAll}
                  className="flex-1"
                  size="lg"
                  variant="outline"
                >
                  Acknowledge All
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AlarmPopup;
