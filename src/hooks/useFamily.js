import { useFamilyContext } from '../context/FamilyContext';
import { usePatientContext } from '../context/PatientContext';

export const useFamily = () => {
  const familyContext = useFamilyContext();
  const patientContext = usePatientContext();
  
  const switchFamilyMember = (patientId) => {
    patientContext.setActivePatientId(patientId);
  };

  return {
    familyName: familyContext.familyName,
    familyMembers: familyContext.familyMembers,
    activePatientId: patientContext.activePatientId,
    switchFamilyMember
  };
};
