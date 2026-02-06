import React from 'react';
import { Mail, Phone, MapPin, Shield, Heart } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Badge from '@/components/common/Badge';

const PatientProfile = ({ patient }) => {
  if (!patient) return null;

  const infoItems = [
    { icon: Phone, label: 'Phone', value: patient.phone },
    { icon: Mail, label: 'Email', value: patient.email || 'Not provided' },
    { icon: MapPin, label: 'Address', value: patient.address },
    { icon: Shield, label: 'Insurance', value: `${patient.insuranceProvider} (${patient.insuranceId})` },
    { icon: Heart, label: 'Primary Physician', value: patient.primaryPhysician },
  ];

  return (
    <div className="card-medical overflow-hidden">
      {/* Header */}
      <div className="bg-primary/5 p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Avatar className="h-24 w-24">
            <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
              {patient.avatar}
            </AvatarFallback>
          </Avatar>
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold">{patient.name}</h2>
            <p className="text-muted-foreground">
              {patient.age} years old • {patient.gender} • Blood Type: {patient.bloodType}
            </p>
            <p className="text-sm text-muted-foreground">DOB: {patient.dateOfBirth}</p>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="p-6 space-y-4">
        {infoItems.map((item, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-muted">
              <item.icon className="w-4 h-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{item.label}</p>
              <p className="font-medium">{item.value}</p>
            </div>
          </div>
        ))}

        {/* Allergies */}
        <div className="pt-4 border-t border-border">
          <h4 className="text-sm font-medium mb-2">Known Allergies</h4>
          <div className="flex flex-wrap gap-2">
            {patient.allergies?.length > 0 ? (
              patient.allergies.map((allergy, i) => (
                <Badge key={i} variant="destructive">{allergy}</Badge>
              ))
            ) : (
              <span className="text-sm text-muted-foreground">No known allergies</span>
            )}
          </div>
        </div>

        {/* Chronic Conditions */}
        <div className="pt-4 border-t border-border">
          <h4 className="text-sm font-medium mb-2">Chronic Conditions</h4>
          <div className="flex flex-wrap gap-2">
            {patient.chronicConditions?.length > 0 ? (
              patient.chronicConditions.map((condition, i) => (
                <Badge key={i} variant="warning">{condition}</Badge>
              ))
            ) : (
              <span className="text-sm text-muted-foreground">No chronic conditions</span>
            )}
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="pt-4 border-t border-border">
          <h4 className="text-sm font-medium mb-2">Emergency Contact</h4>
          <p className="font-medium">{patient.emergencyContact}</p>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
