import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PatientProfile from '@/components/patient/PatientProfile';
import FamilyMemberCard from '@/components/family/FamilyMemberCard';
import { usePatient } from '@/hooks/usePatient';
import { useFamily } from '@/hooks/useFamily';

const Profile = () => {
  const { activePatient } = usePatient();
  const { familyMembers, activePatientId, switchFamilyMember, familyName } = useFamily();

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">Patient Profile</h1>
          <p className="text-muted-foreground">View and manage patient information.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Patient Profile */}
          <div className="lg:col-span-2">
            <PatientProfile patient={activePatient} />
          </div>

          {/* Family Members */}
          <div>
            <div className="card-medical p-6">
              <h3 className="text-lg font-semibold mb-4">{familyName}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Switch between family members to view their health records.
              </p>
              <div className="space-y-3">
                {familyMembers.map((member) => (
                  <FamilyMemberCard
                    key={member.patientId}
                    member={member}
                    isActive={member.patientId === activePatientId}
                    onSelect={switchFamilyMember}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
