import { Transaction } from '../types';
import { Trash2, Download, Link2 } from 'lucide-react';

interface SidebarProps {
  transactions: Transaction[];
  onClearAll: () => void;
}

export function Sidebar({ transactions, onClearAll }: SidebarProps) {
  const exportToCSV = () => {
    if (transactions.length === 0) return;

    const headers = ['Type', 'Amount (₹)', 'Description', 'Date', 'Recorded By'];
    const rows = transactions.map((t) => [
      t.type,
      t.amount.toFixed(2),
      t.description,
      new Date(t.date).toLocaleString('en-IN'),
      t.recordedBy,
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `room-wallet-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyPageLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Page link copied to clipboard!');
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      onClearAll();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Tools</h2>

      <div className="space-y-3">
        <button
          onClick={exportToCSV}
          disabled={transactions.length === 0}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <Download size={20} />
          Export CSV
        </button>

        <button
          onClick={copyPageLink}
          className="w-full flex items-center justify-center gap-2 bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 transition-colors font-medium"
        >
          <Link2 size={20} />
          Copy Page Link
        </button>

        <button
          onClick={handleClearAll}
          className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors font-medium"
        >
          <Trash2 size={20} />
          Clear All Data
        </button>
      </div>

      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
        <p className="text-sm text-yellow-800">
          <strong>Note:</strong> All data is stored locally in your browser. Use the same browser and device to access your data.
        </p>
      </div>
    </div>
  );
}
