import React, { createContext, useContext, useState } from 'react';
import familyData from '../data/family.json';
import patientsData from '../data/patients.json';

const FamilyContext = createContext(undefined);

export const FamilyProvider = ({ children }) => {
  const [family] = useState(familyData);
  const [familyMembers] = useState(() => {
    return familyData.members.map(member => {
      const patient = patientsData.patients.find(p => p.id === member.patientId);
      return {
        ...member,
        ...patient
      };
    });
  });

  return (
    <FamilyContext.Provider value={{
      family,
      familyMembers,
      familyName: family.familyName
    }}>
      {children}
    </FamilyContext.Provider>
  );
};

export const useFamilyContext = () => {
  const context = useContext(FamilyContext);
  if (context === undefined) {
    throw new Error('useFamilyContext must be used within a FamilyProvider');
  }
  return context;
};
