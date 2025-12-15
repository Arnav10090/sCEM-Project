import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

export interface Alarm {
  id: string;
  level: 'CRITICAL' | 'WARNING' | 'INFO';
  message: string;
  device: string;
  eventTime: string;
  acknowledged: boolean;
  acknowledgedTime?: string;
}

interface AlarmContextType {
  pendingAlarms: Alarm[];
  acknowledgedAlarms: Alarm[];
  archivedAlarms: Alarm[];
  addAlarm: (alarm: Omit<Alarm, 'id' | 'acknowledged'>) => void;
  acknowledgeAlarm: (alarmId: string) => void;
  acknowledgeAll: () => void;
  getFooterAlarms: () => Alarm[];
}

const AlarmContext = createContext<AlarmContextType | undefined>(undefined);

export const AlarmProvider = ({ children }: { children: ReactNode }) => {
  const [pendingAlarms, setPendingAlarms] = useState<Alarm[]>([]);
  const [acknowledgedAlarms, setAcknowledgedAlarms] = useState<Alarm[]>([]);
  const [archivedAlarms, setArchivedAlarms] = useState<Alarm[]>([]);

  const addAlarm = useCallback((alarm: Omit<Alarm, 'id' | 'acknowledged'>) => {
    const newAlarm: Alarm = {
      ...alarm,
      id: `alarm-${Date.now()}-${Math.random()}`,
      acknowledged: false,
    };
    setPendingAlarms(prev => [newAlarm, ...prev]);
  }, []);

  const acknowledgeAlarm = useCallback((alarmId: string) => {
    const alarm = pendingAlarms.find(a => a.id === alarmId);
    if (alarm) {
      const acknowledgedAlarm: Alarm = {
        ...alarm,
        acknowledged: true,
        acknowledgedTime: new Date().toLocaleTimeString(),
      };

      setPendingAlarms(prev => prev.filter(a => a.id !== alarmId));

      setAcknowledgedAlarms(prev => {
        const updated = [acknowledgedAlarm, ...prev];
        if (updated.length > 10) {
          const toArchive = updated.slice(10);
          setArchivedAlarms(prevArchived => [
            ...toArchive,
            ...prevArchived,
          ]);
          return updated.slice(0, 10);
        }
        return updated;
      });
    }
  }, [pendingAlarms]);

  const acknowledgeAll = useCallback(() => {
    const allPending = [...pendingAlarms];
    const now = new Date().toLocaleTimeString();

    const acknowledgedList = allPending.map(alarm => ({
      ...alarm,
      acknowledged: true,
      acknowledgedTime: now,
    }));

    setPendingAlarms([]);

    setAcknowledgedAlarms(prev => {
      const updated = [...acknowledgedList, ...prev];
      if (updated.length > 10) {
        const toArchive = updated.slice(10);
        setArchivedAlarms(prevArchived => [
          ...toArchive,
          ...prevArchived,
        ]);
        return updated.slice(0, 10);
      }
      return updated;
    });
  }, [pendingAlarms]);

  const getFooterAlarms = useCallback(() => {
    return acknowledgedAlarms;
  }, [acknowledgedAlarms]);

  return (
    <AlarmContext.Provider
      value={{
        pendingAlarms,
        acknowledgedAlarms,
        archivedAlarms,
        addAlarm,
        acknowledgeAlarm,
        acknowledgeAll,
        getFooterAlarms,
      }}
    >
      {children}
    </AlarmContext.Provider>
  );
};

export const useAlarm = () => {
  const context = useContext(AlarmContext);
  if (context === undefined) {
    throw new Error('useAlarm must be used within an AlarmProvider');
  }
  return context;
};
