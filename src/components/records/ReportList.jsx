import React from 'react';
import { FileText, Eye, Printer } from 'lucide-react';
import Badge from '@/components/common/Badge';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/utils/formatDate';
import { useReports } from '@/hooks/useReports';

const ReportList = ({ reports }) => {
  const { openReport } = useReports();

  const getTypeColor = (type) => {
    switch (type) {
      case 'Blood Test': return 'bg-destructive/10 text-destructive';
      case 'Imaging': return 'bg-info/10 text-info';
      case 'Allergy Test': return 'bg-warning/10 text-warning';
      default: return 'bg-primary/10 text-primary';
    }
  };

  if (!reports?.length) {
    return (
      <div className="card-medical p-8 text-center">
        <p className="text-muted-foreground">No test reports available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reports.map((report) => (
        <div key={report.id} className="card-medical p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-lg ${getTypeColor(report.type)}`}>
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold">{report.title}</h4>
                <p className="text-sm text-muted-foreground">{report.type}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {formatDate(report.date)} • {report.facility}
                </p>
              </div>
            </div>
            <Badge variant={report.status === 'completed' ? 'success' : 'warning'}>
              {report.status}
            </Badge>
          </div>
          
          <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Ordered by {report.orderedBy}
            </p>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => openReport(report)}
              >
                <Eye className="w-4 h-4 mr-1" />
                View
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  openReport(report);
                  setTimeout(() => window.print(), 100);
                }}
              >
                <Printer className="w-4 h-4 mr-1" />
                Print
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReportList;
