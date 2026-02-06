import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Badge from '@/components/common/Badge';

const PatientCard = ({ patient }) => {
  if (!patient) return null;

  return (
    <div className="card-medical p-6">
      <div className="flex items-start gap-4">
        <Avatar className="h-16 w-16">
          <AvatarFallback className="bg-primary text-primary-foreground text-lg">
            {patient.avatar}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold">{patient.name}</h3>
          <p className="text-sm text-muted-foreground">
            {patient.age} years old • {patient.gender} • {patient.bloodType}
          </p>
          
          {patient.allergies?.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              <span className="text-xs text-muted-foreground mr-1">Allergies:</span>
              {patient.allergies.map((allergy, i) => (
                <Badge key={i} variant="destructive">{allergy}</Badge>
              ))}
            </div>
          )}
          
          {patient.chronicConditions?.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              <span className="text-xs text-muted-foreground mr-1">Conditions:</span>
              {patient.chronicConditions.map((condition, i) => (
                <Badge key={i} variant="warning">{condition}</Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientCard;
