import { useEffect } from 'react';
import { useAlarm } from '@/context/AlarmContext';

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
  {
    level: 'INFO' as const,
    message: 'Flow rate abnormal',
    device: 'PUMP-02',
  },
  {
    level: 'CRITICAL' as const,
    message: 'Equipment shutdown imminent',
    device: 'REACTOR-01',
  },
];

export const useAlarmGenerator = () => {
  const { addAlarm } = useAlarm();

  useEffect(() => {
    const interval = setInterval(() => {
      const template = alarmTemplates[Math.floor(Math.random() * alarmTemplates.length)];
      addAlarm({
        level: template.level,
        message: template.message,
        device: template.device,
        eventTime: new Date().toLocaleTimeString(),
      });
    }, 60000);

    return () => clearInterval(interval);
  }, [addAlarm]);
};
