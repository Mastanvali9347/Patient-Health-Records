import React from 'react';
import { Pill, Calendar, RefreshCw } from 'lucide-react';
import Badge from '@/components/common/Badge';
import { formatDate } from '@/utils/formatDate';

const PrescriptionList = ({ prescriptions }) => {
  if (!prescriptions?.length) {
    return (
      <div className="card-medical p-8 text-center">
        <p className="text-muted-foreground">No active prescriptions.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {prescriptions.map((rx) => (
        <div key={rx.id} className="card-medical p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Pill className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold">{rx.medication}</h4>
                <p className="text-sm text-muted-foreground">{rx.dosage}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Prescribed by {rx.doctor}
                </p>
              </div>
            </div>
            <Badge variant={rx.status === 'active' ? 'success' : 'default'}>
              {rx.status}
            </Badge>
          </div>
          
          <div className="mt-4 pt-4 border-t border-border flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>Prescribed: {formatDate(rx.prescribedDate)}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>Expires: {formatDate(rx.expiryDate)}</span>
            </div>
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-primary" />
              <span className="text-primary font-medium">{rx.refillsRemaining} refills remaining</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PrescriptionList;
