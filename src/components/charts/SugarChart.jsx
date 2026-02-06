import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatDate } from '@/utils/formatDate';

const SugarChart = ({ data }) => {
  const chartData = data.map(v => ({
    date: formatDate(v.date),
    glucose: v.glucose
  })).reverse();

  return (
    <div className="card-medical p-6">
      <h3 className="text-lg font-semibold mb-4">Blood Glucose Levels</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="glucoseGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-3))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--chart-3))" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }} 
              stroke="hsl(var(--muted-foreground))"
            />
            <YAxis 
              domain={[70, 180]} 
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
            <Area 
              type="monotone" 
              dataKey="glucose" 
              stroke="hsl(var(--chart-3))" 
              strokeWidth={2}
              fill="url(#glucoseGradient)"
              name="Glucose (mg/dL)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 text-sm text-muted-foreground">
        <p>Normal fasting: 70-100 mg/dL | Pre-diabetic: 100-125 mg/dL | Diabetic: ≥126 mg/dL</p>
      </div>
    </div>
  );
};

export default SugarChart;
