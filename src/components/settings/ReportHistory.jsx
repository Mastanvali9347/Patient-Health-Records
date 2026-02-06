import React from 'react';
import { FileText, Eye, Download } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

const ReportHistory = () => {
  const reports = [
    { id: 1, name: 'Complete Blood Count', patient: 'John Smith', date: '2024-01-15', type: 'Lab Report', action: 'Viewed' },
    { id: 2, name: 'Lipid Panel', patient: 'Sarah Smith', date: '2024-01-12', type: 'Lab Report', action: 'Downloaded' },
    { id: 3, name: 'Chest X-Ray', patient: 'John Smith', date: '2024-01-10', type: 'Imaging', action: 'Viewed' },
    { id: 4, name: 'Thyroid Function Test', patient: 'Emma Smith', date: '2024-01-08', type: 'Lab Report', action: 'Downloaded' },
    { id: 5, name: 'ECG Report', patient: 'John Smith', date: '2024-01-05', type: 'Cardiology', action: 'Viewed' },
    { id: 6, name: 'HbA1c Test', patient: 'Sarah Smith', date: '2024-01-03', type: 'Lab Report', action: 'Downloaded' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Report History</h2>
        <p className="text-sm text-muted-foreground">View your recently accessed medical reports</p>
      </div>

      <div className="rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Report Name</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Action</TableHead>
              <TableHead className="text-right">Options</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary" />
                    {report.name}
                  </div>
                </TableCell>
                <TableCell>{report.patient}</TableCell>
                <TableCell>{report.date}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{report.type}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {report.action === 'Downloaded' ? (
                      <Download className="w-3 h-3 text-green-600" />
                    ) : (
                      <Eye className="w-3 h-3 text-blue-600" />
                    )}
                    <span className="text-sm">{report.action}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>Showing 6 of 24 reports</span>
        <Button variant="outline" size="sm">Load More</Button>
      </div>
    </div>
  );
};

export default ReportHistory;
