import React from 'react';
import { Calendar, Stethoscope, Building2 } from 'lucide-react';
import Badge from '@/components/common/Badge';
import { formatDate } from '@/utils/formatDate';

const MedicalHistoryTable = ({ history }) => {
  const getTypeVariant = (type) => {
    switch (type) {
      case 'Emergency': return 'destructive';
      case 'Specialist Visit': return 'primary';
      case 'Vaccination': return 'success';
      default: return 'default';
    }
  };

  if (!history?.length) {
    return (
      <div className="card-medical p-8 text-center">
        <p className="text-muted-foreground">No medical history records found.</p>
      </div>
    );
  }

  return (
    <div className="card-medical overflow-hidden">
      <div className="overflow-x-auto">
        <table className="table-medical">
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Diagnosis</th>
              <th>Doctor</th>
              <th>Facility</th>
              <th>Follow-up</th>
            </tr>
          </thead>
          <tbody>
            {history.map((record) => (
              <tr key={record.id}>
                <td className="whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    {formatDate(record.date)}
                  </div>
                </td>
                <td>
                  <Badge variant={getTypeVariant(record.type)}>{record.type}</Badge>
                </td>
                <td className="max-w-xs">
                  <p className="font-medium">{record.diagnosis}</p>
                  {record.notes && (
                    <p className="text-sm text-muted-foreground truncate">{record.notes}</p>
                  )}
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <Stethoscope className="w-4 h-4 text-muted-foreground" />
                    {record.doctor}
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{record.facility}</span>
                  </div>
                </td>
                <td>
                  {record.followUp ? (
                    <span className="text-sm text-primary">{formatDate(record.followUp)}</span>
                  ) : (
                    <span className="text-sm text-muted-foreground">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MedicalHistoryTable;
