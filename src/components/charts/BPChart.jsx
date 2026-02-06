import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { formatDate } from '@/utils/formatDate';

const BPChart = ({ data }) => {
  const chartData = data.map(v => {
    const [systolic, diastolic] = v.bp.split('/').map(Number);
    return {
      date: formatDate(v.date),
      systolic,
      diastolic
    };
  }).reverse();

  return (
    <div className="card-medical p-6">
      <h3 className="text-lg font-semibold mb-4">Blood Pressure Trends</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }} 
              stroke="hsl(var(--muted-foreground))"
            />
            <YAxis 
              domain={[60, 160]} 
              tick={{ fontSize: 12 }}
              stroke="hsl(var(--muted-foreground))"
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="systolic" 
              stroke="hsl(var(--chart-5))" 
              strokeWidth={2}
              dot={{ fill: 'hsl(var(--chart-5))' }}
              name="Systolic"
            />
            <Line 
              type="monotone" 
              dataKey="diastolic" 
              stroke="hsl(var(--chart-1))" 
              strokeWidth={2}
              dot={{ fill: 'hsl(var(--chart-1))' }}
              name="Diastolic"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex gap-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-chart-5" />
          <span className="text-muted-foreground">Systolic (Normal: &lt;120)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-chart-1" />
          <span className="text-muted-foreground">Diastolic (Normal: &lt;80)</span>
        </div>
      </div>
    </div>
  );
};

export default BPChart;
