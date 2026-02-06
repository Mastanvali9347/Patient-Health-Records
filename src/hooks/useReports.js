import { useReportContext } from '../context/ReportContext';
import { usePatientContext } from '../context/PatientContext';
import { printReport } from '../utils/printHelper';

export const useReports = () => {
  const reportContext = useReportContext();
  const patientContext = usePatientContext();
  
  const getActivePatientReports = () => {
    return reportContext.getPatientReports(patientContext.activePatientId);
  };

  const handlePrint = () => {
    printReport();
  };

  return {
    reports: getActivePatientReports(),
    allReports: reportContext.reports,
    selectedReport: reportContext.selectedReport,
    isPrintMode: reportContext.isPrintMode,
    openReport: reportContext.openReportPreview,
    closeReport: reportContext.closeReportPreview,
    togglePrintMode: reportContext.togglePrintMode,
    printReport: handlePrint
  };
};
