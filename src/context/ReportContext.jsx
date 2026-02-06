import React, { createContext, useContext, useState } from 'react';
import reportsData from '../data/reports.json';

const ReportContext = createContext(undefined);

export const ReportProvider = ({ children }) => {
  const [reports] = useState(reportsData.reports);
  const [selectedReport, setSelectedReport] = useState(null);
  const [isPrintMode, setIsPrintMode] = useState(false);

  const getPatientReports = (patientId) => {
    return reports.filter(r => r.patientId === patientId);
  };

  const openReportPreview = (report) => {
    setSelectedReport(report);
  };

  const closeReportPreview = () => {
    setSelectedReport(null);
    setIsPrintMode(false);
  };

  const togglePrintMode = () => {
    setIsPrintMode(!isPrintMode);
  };

  return (
    <ReportContext.Provider value={{
      reports,
      selectedReport,
      isPrintMode,
      getPatientReports,
      openReportPreview,
      closeReportPreview,
      togglePrintMode,
      setSelectedReport
    }}>
      {children}
    </ReportContext.Provider>
  );
};

export const useReportContext = () => {
  const context = useContext(ReportContext);
  if (context === undefined) {
    throw new Error('useReportContext must be used within a ReportProvider');
  }
  return context;
};
