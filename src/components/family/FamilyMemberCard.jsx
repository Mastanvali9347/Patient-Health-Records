import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const FamilyMemberCard = ({ member, isActive, onSelect }) => {
  return (
    <button
      onClick={() => onSelect(member.patientId)}
      className={`
        flex items-center gap-3 p-4 rounded-xl border transition-all w-full text-left
        ${isActive 
          ? 'border-primary bg-primary/5 ring-1 ring-primary' 
          : 'border-border hover:border-primary/50 hover:bg-muted/50'
        }
      `}
    >
      <Avatar className="h-12 w-12">
        <AvatarFallback className={`text-sm ${isActive ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>
          {member.avatar}
        </AvatarFallback>
      </Avatar>
      <div>
        <p className="font-medium">{member.name}</p>
        <p className="text-sm text-muted-foreground">{member.relationship}</p>
      </div>
      {isActive && (
        <span className="ml-auto text-xs font-medium text-primary">Active</span>
      )}
    </button>
  );
};

export default FamilyMemberCard;
