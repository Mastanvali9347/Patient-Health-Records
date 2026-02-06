import { usePatientContext } from '../context/PatientContext';

export const usePatient = () => {
  const context = usePatientContext();
  
  return {
    activePatient: context.activePatient,
    setActivePatient: context.setActivePatientId,
    patients: context.patients,
    getMedicalHistory: () => context.getPatientMedicalHistory(context.activePatientId),
    getPrescriptions: () => context.getPatientPrescriptions(context.activePatientId),
    getVitals: () => context.getPatientVitals(context.activePatientId)
  };
};
