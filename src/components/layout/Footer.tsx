import { useState } from 'react';
import { ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react';

interface AlarmEntry {
  message: string;
  time: string;
}

const sampleAlarms: AlarmEntry[] = [
  { message: 'Motor temperature exceeded threshold - requires immediate attention', time: '10:10:42 AM' },
  { message: 'Safety observation raised for Equipment inspection', time: '10:10:42 AM' },
  { message: 'System health normal - all parameters within limits', time: '10:10:42 AM' },
  { message: 'Vibration levels abnormal on bearing assembly', time: '10:09:15 AM' },
  { message: 'Scheduled maintenance due for Pump #3', time: '10:08:30 AM' },
];

const Footer = () => {
  const [isExpanded, setIsExpanded] = useState(false);

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
            System & Solutions related Alarms message at bottom, which can be extended for 5/6 rows. Top side latest alarms
          </span>
        </div>
        <div className="flex items-center gap-2 text-gray-900 flex-shrink-0">
          <span className="text-sm font-medium">{isExpanded ? 'Collapse' : 'Expand'}</span>
          {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </div>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-4 py-3 overflow-auto max-h-64 bg-white">
          <div className="space-y-2">
            {sampleAlarms.map((alarm, idx) => (
              <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0">
                <span className="text-sm text-gray-800 flex-1">{alarm.message}</span>
                <span className="text-xs text-gray-600 font-medium ml-4 flex-shrink-0">{alarm.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Footer;
