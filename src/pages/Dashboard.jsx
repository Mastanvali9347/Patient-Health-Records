import React from 'react';
import { Activity, FileText, Pill, Calendar, TrendingUp, TrendingDown, Heart } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PatientCard from '@/components/patient/PatientCard';
import PatientStats from '@/components/patient/PatientStats';
import BPChart from '@/components/charts/BPChart';
import SugarChart from '@/components/charts/SugarChart';
import HeartRateChart from '@/components/charts/HeartRateChart';
import MedicalHistoryTable from '@/components/records/MedicalHistoryTable';
import { usePatient } from '@/hooks/usePatient';

const Dashboard = () => {
  const { activePatient, getMedicalHistory, getPrescriptions, getVitals } = usePatient();
  
  const medicalHistory = getMedicalHistory();
  const prescriptions = getPrescriptions();
  const vitals = getVitals();

  const latestVitals = vitals[0];

  const stats = [
    {
      icon: Activity,
      label: 'Blood Pressure',
      value: latestVitals?.bp || 'N/A',
      bgColor: 'bg-chart-5/10',
      iconColor: 'text-chart-5',
      change: latestVitals ? 'Last recorded' : undefined
    },
    {
      icon: Heart,
      label: 'Heart Rate',
      value: latestVitals ? `${latestVitals.heartRate} BPM` : 'N/A',
      bgColor: 'bg-chart-2/10',
      iconColor: 'text-chart-2'
    },
    {
      icon: FileText,
      label: 'Medical Records',
      value: medicalHistory.length.toString(),
      bgColor: 'bg-chart-1/10',
      iconColor: 'text-chart-1'
    },
    {
      icon: Pill,
      label: 'Active Prescriptions',
      value: prescriptions.filter(p => p.status === 'active').length.toString(),
      bgColor: 'bg-chart-4/10',
      iconColor: 'text-chart-4'
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your health records.</p>
        </div>

        {/* Patient Card */}
        <PatientCard patient={activePatient} />

        {/* Stats Grid */}
        <PatientStats stats={stats} />

        {/* Charts Section */}
        {vitals.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6">
            <BPChart data={vitals} />
            <SugarChart data={vitals} />
          </div>
        )}

        {vitals.length > 0 && (
          <HeartRateChart data={vitals} />
        )}

        {/* Recent Medical History */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Medical History</h2>
          <MedicalHistoryTable history={medicalHistory.slice(0, 3)} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
