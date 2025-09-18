import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, FileSpreadsheet, ExternalLink, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { projectId, publicAnonKey } from '../utils/supabase/info';

export function GoogleSheetsExport() {
  const [isExporting, setIsExporting] = useState(false);
  const [exportStatus, setExportStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [exportMessage, setExportMessage] = useState('');

  const handleExport = async () => {
    setIsExporting(true);
    setExportStatus('idle');
    
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-39c15382/waitlist/google-sheets-export`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });

      const result = await response.json();

      if (response.ok) {
        setExportStatus('success');
        setExportMessage(result.message || 'Export completed successfully!');
      } else {
        throw new Error(result.error || 'Export failed');
      }
    } catch (error) {
      console.error('Export error:', error);
      setExportStatus('error');
      setExportMessage(error instanceof Error ? error.message : 'Export failed');
    } finally {
      setIsExporting(false);
    }
  };

  const handleDirectDownload = async () => {
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-39c15382/waitlist/export`, {
        headers: { 'Authorization': `Bearer ${publicAnonKey}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        
        // Convert to CSV
        const headers = ['Name', 'Email', 'Phone', 'Location', 'Instagram', 'Bib Number', 'Signup Date'];
        const csvContent = [
          headers.join(','),
          ...data.signups.map((signup: any) => [
            `"${signup.name}"`,
            `"${signup.email}"`,
            `"${signup.phone}"`,
            `"${signup.location}"`,
            `"${signup.instagram || ''}"`,
            signup.bibNumber,
            `"${new Date(signup.signupDate).toLocaleDateString()}"`
          ].join(','))
        ].join('\n');

        // Download CSV
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `dash-waitlist-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Download error:', error);
    }
  };

  return (
    <motion.div
      className="bg-gray-900 rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center mb-4">
        <FileSpreadsheet className="w-5 h-5 text-yellow-400 mr-2" />
        <h3 className="text-xl font-bold">Export Waitlist Data</h3>
      </div>

      <div className="space-y-4">
        <p className="text-gray-400 text-sm">
          Export your waitlist data to Google Sheets or download as CSV for analysis and outreach.
        </p>

        {/* Export Status */}
        {exportStatus !== 'idle' && (
          <motion.div
            className={`p-3 rounded-lg flex items-center ${
              exportStatus === 'success' 
                ? 'bg-green-400/10 border border-green-400/20' 
                : 'bg-red-400/10 border border-red-400/20'
            }`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {exportStatus === 'success' ? (
              <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-400 mr-2" />
            )}
            <span className={`text-sm ${exportStatus === 'success' ? 'text-green-400' : 'text-red-400'}`}>
              {exportMessage}
            </span>
          </motion.div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Button
            onClick={handleExport}
            disabled={isExporting}
            className="bg-green-600 hover:bg-green-700 text-white border border-green-500"
          >
            {isExporting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Exporting...
              </>
            ) : (
              <>
                <ExternalLink className="w-4 h-4 mr-2" />
                Export to Sheets
              </>
            )}
          </Button>

          <Button
            onClick={handleDirectDownload}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-800"
          >
            <Download className="w-4 h-4 mr-2" />
            Download CSV
          </Button>
        </div>

        {/* Instructions */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h4 className="text-yellow-400 font-medium mb-2">Setup Instructions:</h4>
          <div className="text-gray-400 text-xs space-y-1">
            <p>1. Create a Google Apps Script with the provided webhook URL</p>
            <p>2. Set up your Google Sheet with proper headers</p>
            <p>3. Use the "Export to Sheets" button to send data automatically</p>
            <p>4. Or download CSV for manual import</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}