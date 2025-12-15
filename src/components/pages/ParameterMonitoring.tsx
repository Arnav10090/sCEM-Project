import { useState, useEffect } from 'react';
import { useEquipment } from '@/context/EquipmentContext';
import TrendChart from '../common/TrendChart';
import { Input } from '@/components/ui/input';

interface Parameter {
  sn: number;
  name: string;
  unit: string;
  min: number;
  max: number;
  present: number;
  remarks: string;
}

const equipmentParameters: Record<string, Parameter[]> = {
  'motor-001': [
    { sn: 1, name: 'Vibration DS', unit: 'mm/s', min: 0, max: 10, present: 4.5, remarks: '' },
    { sn: 2, name: 'Vibration NDS', unit: 'mm/s', min: 0, max: 10, present: 3.8, remarks: '' },
    { sn: 3, name: 'Temperature Bearing - DS', unit: '°C', min: 20, max: 80, present: 55, remarks: '' },
    { sn: 4, name: 'Temperature Bearing - NDS', unit: '°C', min: 20, max: 80, present: 52, remarks: '' },
    { sn: 5, name: 'Current', unit: 'A', min: 0, max: 100, present: 45, remarks: '' },
    { sn: 6, name: 'Speed', unit: 'RPM', min: 0, max: 3000, present: 1480, remarks: '' },
    { sn: 7, name: '', unit: '', min: 0, max: 0, present: 0, remarks: '' },
    { sn: 8, name: '', unit: '', min: 0, max: 0, present: 0, remarks: '' },
  ],
  'plc-001': [
    { sn: 1, name: 'CPU Temperature', unit: '°C', min: 20, max: 60, present: 38, remarks: '' },
    { sn: 2, name: 'Power Supply Voltage', unit: 'V', min: 20, max: 28, present: 24, remarks: '' },
    { sn: 3, name: 'Communication Status', unit: 'Status', min: 0, max: 1, present: 1, remarks: '' },
    { sn: 4, name: 'Scan Time', unit: 'ms', min: 0, max: 100, present: 25, remarks: '' },
    { sn: 5, name: 'I/O Module Status', unit: 'Status', min: 0, max: 1, present: 1, remarks: '' },
    { sn: 6, name: 'Memory Usage', unit: '%', min: 0, max: 100, present: 65, remarks: '' },
    { sn: 7, name: '', unit: '', min: 0, max: 0, present: 0, remarks: '' },
    { sn: 8, name: '', unit: '', min: 0, max: 0, present: 0, remarks: '' },
  ],
  'drive-001': [
    { sn: 1, name: 'Output Frequency', unit: 'Hz', min: 0, max: 60, present: 50, remarks: '' },
    { sn: 2, name: 'Output Current', unit: 'A', min: 0, max: 200, present: 85, remarks: '' },
    { sn: 3, name: 'DC Bus Voltage', unit: 'V', min: 300, max: 800, present: 650, remarks: '' },
    { sn: 4, name: 'Heat Sink Temperature', unit: '°C', min: 20, max: 70, present: 45, remarks: '' },
    { sn: 5, name: 'Drive Status', unit: 'Status', min: 0, max: 1, present: 1, remarks: '' },
    { sn: 6, name: 'Efficiency', unit: '%', min: 85, max: 100, present: 96, remarks: '' },
    { sn: 7, name: '', unit: '', min: 0, max: 0, present: 0, remarks: '' },
    { sn: 8, name: '', unit: '', min: 0, max: 0, present: 0, remarks: '' },
  ],
  'pump-001': [
    { sn: 1, name: 'Flow Rate', unit: 'L/min', min: 0, max: 500, present: 350, remarks: '' },
    { sn: 2, name: 'Discharge Pressure', unit: 'bar', min: 0, max: 20, present: 15, remarks: '' },
    { sn: 3, name: 'Bearing Temperature', unit: '°C', min: 20, max: 80, present: 55, remarks: '' },
    { sn: 4, name: 'Motor Current', unit: 'A', min: 0, max: 150, present: 75, remarks: '' },
    { sn: 5, name: 'Vibration Level', unit: 'mm/s', min: 0, max: 8, present: 2.5, remarks: '' },
    { sn: 6, name: 'Efficiency', unit: '%', min: 70, max: 100, present: 88, remarks: '' },
    { sn: 7, name: '', unit: '', min: 0, max: 0, present: 0, remarks: '' },
    { sn: 8, name: '', unit: '', min: 0, max: 0, present: 0, remarks: '' },
  ]
};

const generateTimeLabels = () => {
  const labels = [];
  const now = new Date();
  for (let i = 9; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60000);
    labels.push(time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
  }
  return labels;
};

const generateRandomData = (base: number, variance: number) => {
  return parseFloat((base + (Math.random() - 0.5) * variance * 2).toFixed(2));
};

const ParameterMonitoring = () => {
  const { selectedEquipment } = useEquipment();
  const [parameters, setParameters] = useState<Parameter[]>([]);
  const [chartData, setChartData] = useState<{ time: string; vibration: number; vibration2: number; temperature: number; temperature2: number; current: number; speed: number; speed2: number }[]>([]);

  const handleRemarksChange = (sn: number, remarks: string) => {
    setParameters((prev) =>
      prev.map((param) =>
        param.sn === sn ? { ...param, remarks } : param
      )
    );
  };

  useEffect(() => {
    if (selectedEquipment) {
      const equipmentParams = equipmentParameters[selectedEquipment.id] || equipmentParameters['motor-001'];
      setParameters(equipmentParams);
    }
  }, [selectedEquipment?.id]);

  useEffect(() => {
    const updateChartData = () => {
      const timeLabels = generateTimeLabels();
      const newData = timeLabels.map((time) => ({
        time,
        vibration: generateRandomData(4.5, 1),
        vibration2: generateRandomData(3.8, 1),
        temperature: generateRandomData(55, 5),
        temperature2: generateRandomData(52, 5),
        current: generateRandomData(45, 10),
        speed: generateRandomData(1480, 50),
        speed2: generateRandomData(1470, 50),
      }));
      setChartData(newData);
    };

    updateChartData();
    const interval = setInterval(updateChartData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4 animate-fade-in">
      <p className="text-sm text-muted-foreground italic">
        Parameters for {selectedEquipment?.name || 'selected equipment'} - critical parameters and real-time monitoring data.
      </p>

      <div className="grid grid-cols-2 gap-4">
        {/* Parameter Table */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <table className="data-table">
            <thead>
              <tr>
                <th className="w-12">S.N</th>
                <th>Parameter List</th>
                <th className="w-16">Unit</th>
                <th className="w-16">Min.</th>
                <th className="w-16">Max.</th>
                <th className="w-24">Present Value</th>
                <th>Remarks from Engineer</th>
              </tr>
            </thead>
            <tbody>
              {parameters.map((param) => (
                <tr key={param.sn}>
                  <td className="text-center">{param.sn}</td>
                  <td>{param.name}</td>
                  <td className="text-center">{param.unit}</td>
                  <td className="text-center">{param.min || '-'}</td>
                  <td className="text-center">{param.max || '-'}</td>
                  <td className="text-center font-mono font-medium">
                    {param.present || '-'}
                  </td>
                  <td>{param.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-2 gap-4">
          <TrendChart
            title="Vibration"
            dataKey="vibration"
            secondaryDataKey="vibration2"
            data={chartData}
            color="#4CAF50"
            secondaryColor="#8BC34A"
          />
          <TrendChart
            title="Temperature"
            dataKey="temperature"
            secondaryDataKey="temperature2"
            data={chartData}
            color="#FF9800"
            secondaryColor="#FFC107"
          />
          <TrendChart
            title="Current"
            dataKey="current"
            data={chartData}
            color="#FF5722"
          />
          <TrendChart
            title="Speed"
            dataKey="speed"
            secondaryDataKey="speed2"
            data={chartData}
            color="#2196F3"
            secondaryColor="#03A9F4"
          />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm font-medium text-industrial-red">Manuals / Drawings List</span>
          </div>
          <div className="text-sm text-muted-foreground">
            Drop down list to be displayed
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParameterMonitoring;
