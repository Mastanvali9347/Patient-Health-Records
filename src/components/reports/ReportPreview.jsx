import React from 'react';
import { X, Printer } from 'lucide-react';
import Badge from '@/components/common/Badge';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/utils/formatDate';
import { usePatient } from '@/hooks/usePatient';
import { printReport } from '@/utils/printHelper';

const ReportPreview = ({ report, onClose }) => {
  const { activePatient } = usePatient();

  if (!report) return null;

  const getStatusVariant = (status) => {
    switch (status) {
      case 'normal': return 'success';
      case 'high': return 'destructive';
      case 'low': return 'warning';
      default: return 'default';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-foreground/50 flex items-center justify-center p-4">
      <div className="bg-card rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border no-print">
          <h2 className="text-lg font-semibold">Report Preview</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={printReport}>
              <Printer className="w-4 h-4 mr-1" />
              Print
            </Button>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]" id="printable-report">
          {/* Report Header */}
          <div className="report-header border-b-2 border-foreground pb-4 mb-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold text-primary">HealthPortal</h1>
                <p className="text-sm text-muted-foreground">Medical Laboratory Report</p>
              </div>
              <div className="text-right text-sm">
                <p className="font-medium">{report.facility}</p>
                <p className="text-muted-foreground">Report Date: {formatDate(report.date)}</p>
              </div>
            </div>
          </div>

          {/* Patient Info */}
          <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-muted/30 rounded-lg">
            <div>
              <p className="text-sm text-muted-foreground">Patient Name</p>
              <p className="font-medium">{activePatient?.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Age / Gender</p>
              <p className="font-medium">{activePatient?.age} years / {activePatient?.gender}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Ordered By</p>
              <p className="font-medium">{report.orderedBy}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Report Type</p>
              <p className="font-medium">{report.type}</p>
            </div>
          </div>

          {/* Test Title */}
          <h2 className="text-xl font-semibold mb-4">{report.title}</h2>

          {/* Results Table */}
          <div className="overflow-x-auto">
            <table className="table-medical">
              <thead>
                <tr>
                  <th>Test</th>
                  <th>Result</th>
                  <th>Unit</th>
                  <th>Reference Range</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {report.results.map((result, i) => (
                  <tr key={i}>
                    <td className="font-medium">{result.test}</td>
                    <td className="font-semibold">{result.value}</td>
                    <td>{result.unit || '—'}</td>
                    <td>{result.range || '—'}</td>
                    <td>
                      <Badge variant={getStatusVariant(result.status)}>
                        {result.status.charAt(0).toUpperCase() + result.status.slice(1)}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Notes */}
          {report.notes && (
            <div className="mt-6 p-4 bg-muted/30 rounded-lg">
              <h4 className="font-medium mb-2">Clinical Notes</h4>
              <p className="text-sm text-muted-foreground">{report.notes}</p>
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 pt-4 border-t border-border text-center text-sm text-muted-foreground">
            <p>This is a computer-generated report. For any concerns, please consult your healthcare provider.</p>
            <p className="mt-1">Generated on {formatDate(new Date().toISOString())} via HealthPortal</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPreview;
