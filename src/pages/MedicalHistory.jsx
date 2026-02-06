import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import MedicalHistoryTable from '@/components/records/MedicalHistoryTable';
import { usePatient } from '@/hooks/usePatient';

const MedicalHistory = () => {
  const { activePatient, getMedicalHistory } = usePatient();
  const medicalHistory = getMedicalHistory();

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">Medical History</h1>
          <p className="text-muted-foreground">
            Complete medical history for {activePatient?.name || 'patient'}.
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="stat-card">
            <p className="text-2xl font-bold">{medicalHistory.length}</p>
            <p className="text-sm text-muted-foreground">Total Records</p>
          </div>
          <div className="stat-card">
            <p className="text-2xl font-bold">
              {medicalHistory.filter(h => h.type === 'Checkup').length}
            </p>
            <p className="text-sm text-muted-foreground">Checkups</p>
          </div>
          <div className="stat-card">
            <p className="text-2xl font-bold">
              {medicalHistory.filter(h => h.type === 'Specialist Visit').length}
            </p>
            <p className="text-sm text-muted-foreground">Specialist Visits</p>
          </div>
          <div className="stat-card">
            <p className="text-2xl font-bold">
              {medicalHistory.filter(h => h.followUp).length}
            </p>
            <p className="text-sm text-muted-foreground">Pending Follow-ups</p>
          </div>
        </div>

        {/* Medical History Table */}
        <MedicalHistoryTable history={medicalHistory} />
      </div>
    </DashboardLayout>
  );
};

export default MedicalHistory;
