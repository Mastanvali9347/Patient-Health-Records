import React from 'react';
import { ChevronDown, Users } from 'lucide-react';
import { useFamily } from '@/hooks/useFamily';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const FamilySwitcher = () => {
  const { familyMembers, activePatientId, switchFamilyMember, familyName } = useFamily();
  
  const activeMember = familyMembers.find(m => m.patientId === activePatientId);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-primary text-primary-foreground text-xs">
            {activeMember?.avatar || 'U'}
          </AvatarFallback>
        </Avatar>
        <div className="hidden sm:block text-left">
          <p className="text-sm font-medium">{activeMember?.name}</p>
          <p className="text-xs text-muted-foreground">{activeMember?.relationship}</p>
        </div>
        <ChevronDown className="w-4 h-4 text-muted-foreground" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex items-center gap-2">
          <Users className="w-4 h-4" />
          {familyName}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {familyMembers.map((member) => (
          <DropdownMenuItem
            key={member.patientId}
            onClick={() => switchFamilyMember(member.patientId)}
            className="flex items-center gap-3 cursor-pointer"
          >
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                {member.avatar}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{member.name}</p>
              <p className="text-xs text-muted-foreground">{member.relationship}</p>
            </div>
            {member.patientId === activePatientId && (
              <span className="ml-auto w-2 h-2 bg-primary rounded-full" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FamilySwitcher;
