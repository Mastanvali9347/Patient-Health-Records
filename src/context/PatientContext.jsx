import React, { createContext, useContext, useState } from 'react';
import patientsData from '../data/patients.json';
import recordsData from '../data/records.json';

const PatientContext = createContext(undefined);

export const PatientProvider = ({ children }) => {
  const [patients] = useState(patientsData.patients);
  const [activePatientId, setActivePatientId] = useState(patientsData.patients[0]?.id);
  const [medicalHistory] = useState(recordsData.medicalHistory);
  const [prescriptions] = useState(recordsData.prescriptions);
  const [vitals] = useState(recordsData.vitals);

  const activePatient = patients.find(p => p.id === activePatientId);
  
  const getPatientMedicalHistory = (patientId) => {
    return medicalHistory.filter(mh => mh.patientId === patientId);
  };

  const getPatientPrescriptions = (patientId) => {
    return prescriptions.filter(rx => rx.patientId === patientId);
  };

  const getPatientVitals = (patientId) => {
    return vitals[patientId] || [];
  };

  return (
    <PatientContext.Provider value={{
      patients,
      activePatient,
      activePatientId,
      setActivePatientId,
      medicalHistory,
      prescriptions,
      vitals,
      getPatientMedicalHistory,
      getPatientPrescriptions,
      getPatientVitals
    }}>
      {children}
    </PatientContext.Provider>
  );
};

export const usePatientContext = () => {
  const context = useContext(PatientContext);
  if (context === undefined) {
    throw new Error('usePatientContext must be used within a PatientProvider');
  }
  return context;
};
