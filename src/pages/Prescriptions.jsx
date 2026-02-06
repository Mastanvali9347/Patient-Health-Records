import React from 'react';
import { Pill, AlertCircle } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PrescriptionList from '@/components/records/PrescriptionList';
import { usePatient } from '@/hooks/usePatient';

const Prescriptions = () => {
  const { activePatient, getPrescriptions } = usePatient();
  const prescriptions = getPrescriptions();
  
  const activePrescriptions = prescriptions.filter(p => p.status === 'active');
  const lowRefills = prescriptions.filter(p => p.refillsRemaining <= 2 && p.status === 'active');

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">Prescriptions</h1>
          <p className="text-muted-foreground">
            Manage medications for {activePatient?.name || 'patient'}.
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="stat-card">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Pill className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{activePrescriptions.length}</p>
                <p className="text-sm text-muted-foreground">Active Medications</p>
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-warning/10">
                <AlertCircle className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">{lowRefills.length}</p>
                <p className="text-sm text-muted-foreground">Need Refill Soon</p>
              </div>
            </div>
          </div>
          <div className="stat-card col-span-2 lg:col-span-1">
            <div>
              <p className="text-2xl font-bold">
                {prescriptions.reduce((acc, p) => acc + p.refillsRemaining, 0)}
              </p>
              <p className="text-sm text-muted-foreground">Total Refills Available</p>
            </div>
          </div>
        </div>

        {/* Low Refill Warning */}
        {lowRefills.length > 0 && (
          <div className="bg-warning/10 border border-warning/30 rounded-xl p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-warning">Refill Reminder</h4>
              <p className="text-sm text-muted-foreground">
                {lowRefills.map(p => p.medication).join(', ')} have 2 or fewer refills remaining.
                Contact your physician to renew your prescription.
              </p>
            </div>
          </div>
        )}

        {/* Prescription List */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Active Prescriptions</h2>
          <PrescriptionList prescriptions={activePrescriptions} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Prescriptions;
