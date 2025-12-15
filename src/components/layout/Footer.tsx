import { useState } from 'react';
import { ChevronDown, ChevronUp, AlertTriangle, Clock } from 'lucide-react';
import { useAlarm } from '@/context/AlarmContext';

const Footer = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { acknowledgedAlarms } = useAlarm();

  const getAlarmColor = (level: string) => {
    switch (level) {
      case 'CRITICAL':
        return 'bg-red-100 border-red-300';
      case 'WARNING':
        return 'bg-yellow-100 border-yellow-300';
      case 'INFO':
        return 'bg-blue-100 border-blue-300';
      default:
        return 'bg-gray-100 border-gray-300';
    }
  };

  const getAlarmTextColor = (level: string) => {
    switch (level) {
      case 'CRITICAL':
        return 'text-red-900';
      case 'WARNING':
        return 'text-yellow-900';
      case 'INFO':
        return 'text-blue-900';
      default:
        return 'text-gray-900';
    }
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 bg-industrial-amber border-t border-border transition-all duration-300 ${
        isExpanded ? 'max-h-80' : 'max-h-12'
      } overflow-hidden z-50`}
    >
      {/* Collapsed Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full h-12 px-4 flex items-center justify-between hover:bg-industrial-amber/80 transition-colors"
      >
        <div className="flex items-center gap-2 min-w-0">
          <AlertTriangle className="w-5 h-5 text-gray-900 flex-shrink-0" />
          <span className="text-gray-900 font-medium text-sm truncate">
            {acknowledgedAlarms.length > 0
              ? `Acknowledged Alarms (${acknowledgedAlarms.length}/10)`
              : 'No Acknowledged Alarms'}
          </span>
        </div>
        <div className="flex items-center gap-2 text-gray-900 flex-shrink-0">
          <span className="text-sm font-medium">{isExpanded ? 'Collapse' : 'Expand'}</span>
          {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </div>
      </button>

      {/* Expanded Content */}
      <div className={`px-4 py-3 overflow-auto max-h-64 bg-white transition-all duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
        {acknowledgedAlarms.length > 0 ? (
          <div className="space-y-2">
            {acknowledgedAlarms.map((alarm) => (
              <div
                key={alarm.id}
                className={`flex items-start gap-3 p-2 rounded border ${getAlarmColor(alarm.level)}`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-medium px-1.5 py-0.5 bg-white rounded ${getAlarmTextColor(alarm.level)}`}>
                      {alarm.level}
                    </span>
                  </div>
                  <p className={`text-sm font-medium ${getAlarmTextColor(alarm.level)} break-words`}>
                    {alarm.message}
                  </p>
                  <div className="flex items-center gap-2 text-xs mt-1">
                    <span className={getAlarmTextColor(alarm.level)}>{alarm.device}</span>
                    <span className={getAlarmTextColor(alarm.level)}>•</span>
                    <Clock className="w-3 h-3" />
                    <span className={getAlarmTextColor(alarm.level)}>{alarm.acknowledgedTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-sm text-gray-600">No acknowledged alarms</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Footer;
