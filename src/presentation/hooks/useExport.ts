import { useCallback } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell } from 'docx';
import { toast } from 'sonner';

export function useExport() {
  const exportToCSV = useCallback((data: any[], filename: string) => {
    try {
      if (!data || !data.length) {
        toast.warning('No hay datos para exportar');
        return;
      }
      
      const headers = Object.keys(data[0]);
      const csvContent = [
        headers.join(','),
        ...data.map(row => headers.map(header => `"${String(row[header] || '').replace(/"/g, '""')}"`).join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `${filename}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('Archivo CSV exportado exitosamente');
    } catch (error) {
      toast.error('Error al exportar a CSV');
    }
  }, []);

  const exportToPDF = useCallback((data: any[], headers: string[], filename: string, title: string) => {
    try {
      if (!data || !data.length) {
        toast.warning('No hay datos para exportar');
        return;
      }

      const doc = new jsPDF();
      
      // Title
      doc.setFontSize(16);
      doc.text(title, 14, 22);
      
      // Date
      doc.setFontSize(10);
      doc.text(`Fecha de exportación: ${new Date().toLocaleDateString()}`, 14, 30);

      // Extract raw arrays based on headers
      const body = data.map(item => headers.map(h => {
        // Simple heuristic to match headers with keys
        const key = Object.keys(item).find(k => k.toLowerCase() === h.toLowerCase() || k.includes(h.toLowerCase()));
        return item[key || h] || '-';
      }));

      autoTable(doc, {
        startY: 35,
        head: [headers],
        body: body,
        theme: 'striped',
        headStyles: { fillColor: [0, 63, 146] }, // French Blue
      });

      doc.save(`${filename}.pdf`);
      toast.success('Archivo PDF exportado exitosamente');
    } catch (error) {
      toast.error('Error al exportar a PDF');
    }
  }, []);

  const exportToDOCX = useCallback(async (data: any[], headers: string[], filename: string, title: string) => {
    try {
      if (!data || !data.length) {
        toast.warning('No hay datos para exportar');
        return;
      }

      const tableRows = [
        new TableRow({
          children: headers.map(h => new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: h, bold: true })] })] }))
        }),
        ...data.map(item => new TableRow({
          children: headers.map(h => {
            const key = Object.keys(item).find(k => k.toLowerCase() === h.toLowerCase() || k.includes(h.toLowerCase()));
            return new TableCell({ children: [new Paragraph({ text: String(item[key || h] || '-') })] });
          })
        }))
      ];

      const doc = new Document({
        sections: [{
          properties: {},
          children: [
            new Paragraph({
              children: [new TextRun({ text: title, bold: true, size: 32 })],
            }),
            new Paragraph({
              children: [new TextRun({ text: `Fecha: ${new Date().toLocaleDateString()}`, size: 24 })],
            }),
            new Paragraph({ text: "" }), // Spacing
            new Table({
              rows: tableRows,
            }),
          ],
        }],
      });

      const blob = await Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${filename}.docx`;
      link.click();
      toast.success('Archivo Word exportado exitosamente');
    } catch (error) {
      toast.error('Error al exportar a DOCX');
    }
  }, []);

  return { exportToCSV, exportToPDF, exportToDOCX };
}
