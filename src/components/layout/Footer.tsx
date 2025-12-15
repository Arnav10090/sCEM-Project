import { useState } from 'react';
import { ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react';

interface AlarmEntry {
  no: string;
  level: string;
  message: string;
  device: string;
  eventTime: string;
  recoveredTime: string;
}

const sampleAlarms: AlarmEntry[] = [
  { no: '001', level: 'CRITICAL', message: 'Motor temperature exceeded threshold', device: 'MOTOR-01', eventTime: '2024/12/10 14:23:45', recoveredTime: '2024/12/10 14:35:12' },
  { no: '002', level: 'WARNING', message: 'Vibration levels abnormal', device: 'BEARING-DS', eventTime: '2024/12/10 13:15:00', recoveredTime: '2024/12/10 13:45:30' },
  { no: '003', level: 'INFO', message: 'Scheduled maintenance reminder', device: 'PUMP-07', eventTime: '2024/12/10 09:00:00', recoveredTime: '-' },
  { no: '004', level: 'WARNING', message: 'High current detected', device: 'MOTOR-03', eventTime: '2024/12/10 08:45:22', recoveredTime: '2024/12/10 08:50:00' },
  { no: '005', level: 'CRITICAL', message: 'Safety interlock triggered', device: 'SAFETY-01', eventTime: '2024/12/09 22:30:15', recoveredTime: '2024/12/09 22:45:00' },
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
        <div className="px-4 py-3 overflow-auto max-h-64">
          <table className="data-table w-full text-sm">
            <thead>
              <tr>
                <th className="w-16">Alarm No.</th>
                <th className="w-24">Level</th>
                <th>Message</th>
                <th className="w-28">Device</th>
                <th className="w-40">Event Time</th>
                <th className="w-40">Recovered Time</th>
              </tr>
            </thead>
            <tbody>
              {sampleAlarms.map((alarm) => (
                <tr key={alarm.no} className="bg-card">
                  <td className="font-mono">{alarm.no}</td>
                  <td>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      alarm.level === 'CRITICAL' ? 'bg-destructive text-destructive-foreground' :
                      alarm.level === 'WARNING' ? 'bg-yellow-500 text-white' :
                      'bg-blue-500 text-white'
                    }`}>
                      {alarm.level}
                    </span>
                  </td>
                  <td>{alarm.message}</td>
                  <td className="font-mono">{alarm.device}</td>
                  <td className="font-mono">{alarm.eventTime}</td>
                  <td className="font-mono">{alarm.recoveredTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Footer;
