import React from 'react';
import { Download, FileText, FileDown } from 'lucide-react';
import { useExport } from '../../hooks/useExport';

interface ExportButtonsProps {
  data: any[];
  headers: string[];
  filename: string;
  title: string;
}

export const ExportButtons: React.FC<ExportButtonsProps> = ({ data, headers, filename, title }) => {
  const { exportToCSV, exportToPDF, exportToDOCX } = useExport();

  return (
    <div className="flex items-center gap-2">
      <button 
        onClick={() => exportToCSV(data, filename)}
        className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors shadow-sm"
      >
        <FileText className="w-4 h-4 text-green-600" />
        <span>CSV</span>
      </button>
      <button 
        onClick={() => exportToPDF(data, headers, filename, title)}
        className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors shadow-sm"
      >
        <FileDown className="w-4 h-4 text-red-600" />
        <span>PDF</span>
      </button>
      <button 
        onClick={() => exportToDOCX(data, headers, filename, title)}
        className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors shadow-sm"
      >
        <Download className="w-4 h-4 text-blue-600" />
        <span>Word</span>
      </button>
    </div>
  );
};
