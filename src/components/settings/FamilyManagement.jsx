import React, { useState } from 'react';
import { Plus, Edit2, Trash2, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useFamily } from '@/hooks/useFamily';
import AddFamilyMemberModal from '../family/AddFamilyMemberModal';

const FamilyManagement = () => {
  const { familyMembers } = useFamily();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);

  const handleEdit = (member) => {
    setEditingMember(member);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingMember(null);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Family Management</h2>
          <p className="text-sm text-muted-foreground">Manage family member access</p>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="w-4 h-4 mr-2" />
          Add Member
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {familyMembers.map((member) => (
          <div 
            key={member.patientId}
            className="p-4 bg-muted/30 rounded-lg border border-border"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {member.avatar || member.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-foreground">{member.name}</p>
                  <p className="text-sm text-muted-foreground">{member.relationship}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant={member.accessLevel === 'full' ? 'default' : 'secondary'}>
                      {member.accessLevel === 'full' ? 'Full Access' : 'Limited'}
                    </Badge>
                    {member.relationship === 'Self' && (
                      <Badge variant="outline">Primary</Badge>
                    )}
                  </div>
                </div>
              </div>
              
              {member.relationship !== 'Self' && (
                <div className="flex items-center gap-1">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => handleEdit(member)}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
            
            <div className="mt-3 pt-3 border-t border-border">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-muted-foreground">Age:</span>
                  <span className="ml-1 text-foreground">{member.age || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Gender:</span>
                  <span className="ml-1 text-foreground">{member.gender || 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AddFamilyMemberModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        member={editingMember}
      />
    </div>
  );
};

export default FamilyManagement;
