import React from 'react';
import { cn } from '@/lib/utils';

const PatientStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="stat-card">
          <div className="flex items-center gap-3">
            <div className={cn('p-2 rounded-lg', stat.bgColor || 'bg-primary/10')}>
              <stat.icon className={cn('w-5 h-5', stat.iconColor || 'text-primary')} />
            </div>
            <div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </div>
          {stat.change && (
            <p className={cn(
              'text-xs mt-2',
              stat.changeType === 'positive' ? 'text-success' : 'text-destructive'
            )}>
              {stat.change}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default PatientStats;
