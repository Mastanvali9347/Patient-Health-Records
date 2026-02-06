import React, { useState } from 'react';
import { Plus, Users } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useFamily } from '@/hooks/useFamily';
import AddFamilyMemberModal from '../components/family/AddFamilyMemberModal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Family = () => {
  const { familyMembers, activePatientId, switchFamilyMember, familyName } = useFamily();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Family Members</h1>
            <p className="text-muted-foreground">{familyName} - Manage family access</p>
          </div>
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Member
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {familyMembers.map((member) => (
            <Card 
              key={member.patientId}
              className={`cursor-pointer transition-all hover:shadow-md ${
                activePatientId === member.patientId ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => switchFamilyMember(member.patientId)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                      {member.avatar || member.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{member.relationship}</p>
                    {activePatientId === member.patientId && (
                      <Badge className="mt-1">Active</Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Age</span>
                    <p className="font-medium">{member.age || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Gender</span>
                    <p className="font-medium">{member.gender || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Blood Type</span>
                    <p className="font-medium">{member.bloodType || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Access</span>
                    <p className="font-medium capitalize">{member.accessLevel}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <AddFamilyMemberModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </DashboardLayout>
  );
};

export default Family;
