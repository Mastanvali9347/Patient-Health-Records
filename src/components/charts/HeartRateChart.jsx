import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatDate } from '@/utils/formatDate';

const HeartRateChart = ({ data }) => {
  const chartData = data.map(v => ({
    date: formatDate(v.date),
    heartRate: v.heartRate
  })).reverse();

  const getBarColor = (value) => {
    if (value < 60) return 'hsl(var(--chart-4))';
    if (value > 100) return 'hsl(var(--chart-5))';
    return 'hsl(var(--chart-2))';
  };

  return (
    <div className="card-medical p-6">
      <h3 className="text-lg font-semibold mb-4">Heart Rate History</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }} 
              stroke="hsl(var(--muted-foreground))"
            />
            <YAxis 
              domain={[50, 110]} 
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
            <Bar 
              dataKey="heartRate" 
              fill="hsl(var(--chart-2))" 
              radius={[4, 4, 0, 0]}
              name="Heart Rate (BPM)"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 text-sm text-muted-foreground">
        <p>Normal resting heart rate: 60-100 BPM</p>
      </div>
    </div>
  );
};

export default HeartRateChart;
