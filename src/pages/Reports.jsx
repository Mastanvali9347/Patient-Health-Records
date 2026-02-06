import React from 'react';
import { FileText, CheckCircle2, Clock } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ReportList from '@/components/records/ReportList';
import ReportPreview from '@/components/reports/ReportPreview';
import { useReports } from '@/hooks/useReports';
import { usePatient } from '@/hooks/usePatient';

const Reports = () => {
  const { activePatient } = usePatient();
  const { reports, selectedReport, closeReport } = useReports();

  const completedReports = reports.filter(r => r.status === 'completed');
  const pendingReports = reports.filter(r => r.status === 'pending');

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">Test Reports</h1>
          <p className="text-muted-foreground">
            View and print lab results for {activePatient?.name || 'patient'}.
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="stat-card">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{reports.length}</p>
                <p className="text-sm text-muted-foreground">Total Reports</p>
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/10">
                <CheckCircle2 className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{completedReports.length}</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </div>
          </div>
          <div className="stat-card col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-warning/10">
                <Clock className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">{pendingReports.length}</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </div>
          </div>
        </div>

        {/* Report List */}
        <div>
          <h2 className="text-xl font-semibold mb-4">All Reports</h2>
          <ReportList reports={reports} />
        </div>
      </div>

      {/* Report Preview Modal */}
      {selectedReport && (
        <ReportPreview report={selectedReport} onClose={closeReport} />
      )}
    </DashboardLayout>
  );
};

export default Reports;
