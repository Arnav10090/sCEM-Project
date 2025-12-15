import { useAlarm } from '@/context/AlarmContext';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

const AlarmTestGenerator = () => {
  const { addAlarm } = useAlarm();

  const alarmTemplates = [
    {
      level: 'CRITICAL' as const,
      message: 'Motor temperature exceeded threshold',
      device: 'MOTOR-01',
    },
    {
      level: 'WARNING' as const,
      message: 'Vibration levels abnormal',
      device: 'BEARING-DS',
    },
    {
      level: 'INFO' as const,
      message: 'System health normal - all parameters within limits',
      device: 'SYSTEM-01',
    },
    {
      level: 'CRITICAL' as const,
      message: 'High current detected',
      device: 'MOTOR-03',
    },
    {
      level: 'WARNING' as const,
      message: 'Bearing temperature high',
      device: 'PUMP-07',
    },
    {
      level: 'INFO' as const,
      message: 'Speed deviation detected',
      device: 'DRIVE-01',
    },
    {
      level: 'CRITICAL' as const,
      message: 'Safety interlock triggered',
      device: 'SAFETY-01',
    },
    {
      level: 'WARNING' as const,
      message: 'Pressure limit exceeded',
      device: 'COMP-02',
    },
  ];

  const generateSingleAlarm = () => {
    const template = alarmTemplates[Math.floor(Math.random() * alarmTemplates.length)];
    addAlarm({
      level: template.level,
      message: template.message,
      device: template.device,
      eventTime: new Date().toLocaleTimeString(),
    });
  };

  const generateMultipleAlarms = () => {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const template = alarmTemplates[Math.floor(Math.random() * alarmTemplates.length)];
        addAlarm({
          level: template.level,
          message: template.message,
          device: template.device,
          eventTime: new Date().toLocaleTimeString(),
        });
      }, i * 500);
    }
  };

  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-2 bg-card p-3 rounded-lg border border-border shadow-lg">
      <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-1">
        <AlertTriangle className="w-4 h-4" />
        <span>Test Alarms</span>
      </div>
      <Button
        onClick={generateSingleAlarm}
        size="sm"
        variant="outline"
        className="w-32 text-xs"
      >
        Add 1 Alarm
      </Button>
      <Button
        onClick={generateMultipleAlarms}
        size="sm"
        variant="outline"
        className="w-32 text-xs"
      >
        Add 5 Alarms
      </Button>
    </div>
  );
};

export default AlarmTestGenerator;
