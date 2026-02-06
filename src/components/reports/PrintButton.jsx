import React from 'react';
import { Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { printReport } from '@/utils/printHelper';

const PrintButton = ({ className }) => {
  return (
    <Button 
      variant="outline" 
      onClick={printReport}
      className={className}
    >
      <Printer className="w-4 h-4 mr-2" />
      Print Report
    </Button>
  );
};

export default PrintButton;
