import React from 'react';
import { Download, FileText, Image, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const Downloads = () => {
  const downloads = [
    { id: 1, name: 'Blood_Test_Report_Jan2024.pdf', type: 'PDF', size: '245 KB', date: '2024-01-15', status: 'completed' },
    { id: 2, name: 'Chest_Xray_Image.png', type: 'Image', size: '1.2 MB', date: '2024-01-12', status: 'completed' },
    { id: 3, name: 'Prescription_Dr_Johnson.pdf', type: 'PDF', size: '89 KB', date: '2024-01-10', status: 'completed' },
    { id: 4, name: 'MRI_Scan_Results.pdf', type: 'PDF', size: '3.4 MB', date: '2024-01-08', status: 'completed' },
    { id: 5, name: 'ECG_Report_Graph.png', type: 'Image', size: '567 KB', date: '2024-01-05', status: 'completed' },
  ];

  const getIcon = (type) => {
    return type === 'PDF' ? FileText : Image;
  };

  const getTypeColor = (type) => {
    return type === 'PDF' ? 'destructive' : 'secondary';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Downloads</h2>
          <p className="text-sm text-muted-foreground">Your downloaded medical documents</p>
        </div>
        <Button variant="outline" size="sm">
          <Trash2 className="w-4 h-4 mr-2" />
          Clear All
        </Button>
      </div>

      <div className="space-y-3">
        {downloads.map((file) => {
          const Icon = getIcon(file.type);
          return (
            <div 
              key={file.id}
              className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg ${file.type === 'PDF' ? 'bg-red-100 dark:bg-red-900/30' : 'bg-blue-100 dark:bg-blue-900/30'}`}>
                  <Icon className={`w-5 h-5 ${file.type === 'PDF' ? 'text-red-600' : 'text-blue-600'}`} />
                </div>
                <div>
                  <p className="font-medium text-sm text-foreground">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {file.size} • Downloaded on {file.date}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Badge variant={getTypeColor(file.type)}>{file.type}</Badge>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Download className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-4 bg-muted/50 rounded-lg text-center">
        <p className="text-sm text-muted-foreground">
          Total: 5 files • {(5.5).toFixed(1)} MB used
        </p>
      </div>
    </div>
  );
};

export default Downloads;
