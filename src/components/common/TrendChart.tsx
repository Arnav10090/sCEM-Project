import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface TrendChartProps {
  title: string;
  dataKey: string;
  data: Array<{ time: string; [key: string]: number | string }>;
  color?: string;
  secondaryDataKey?: string;
  secondaryColor?: string;
}

const TrendChart = ({ 
  title, 
  dataKey, 
  data, 
  color = '#4CAF50',
  secondaryDataKey,
  secondaryColor = '#FFA726'
}: TrendChartProps) => {
  return (
    <div className="chart-container h-48">
      <h4 className="text-sm font-medium text-foreground mb-2">{title}</h4>
      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="time" 
            tick={{ fontSize: 10 }} 
            stroke="hsl(var(--muted-foreground))"
          />
          <YAxis 
            tick={{ fontSize: 10 }} 
            stroke="hsl(var(--muted-foreground))"
            label={{ 
              value: title, 
              angle: -90, 
              position: 'insideLeft',
              style: { fontSize: 10, fill: 'hsl(var(--muted-foreground))' }
            }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(var(--card))', 
              border: '1px solid hsl(var(--border))',
              borderRadius: '4px',
              fontSize: 12
            }}
          />
          {secondaryDataKey && <Legend />}
          <Line 
            type="monotone" 
            dataKey={dataKey} 
            stroke={color} 
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
          {secondaryDataKey && (
            <Line 
              type="monotone" 
              dataKey={secondaryDataKey} 
              stroke={secondaryColor} 
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendChart;
