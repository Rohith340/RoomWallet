import { Transaction, FilterType } from '../types';
import { Copy, Trash2, ArrowUpCircle, ArrowDownCircle, Search, Filter } from 'lucide-react';
import { useState, useMemo } from 'react';

interface TransactionsListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

export function TransactionsList({ transactions, onDelete }: TransactionsListProps) {
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTransactions = useMemo(() => {
    let filtered = transactions;

    if (filterType !== 'all') {
      filtered = filtered.filter((t) => t.type === filterType);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.description.toLowerCase().includes(query) ||
          t.recordedBy.toLowerCase().includes(query) ||
          t.amount.toString().includes(query)
      );
    }

    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [transactions, filterType, searchQuery]);

  const copyToClipboard = (transaction: Transaction) => {
    const text = `Type: ${transaction.type.toUpperCase()}\nAmount: ₹${transaction.amount}\nDescription: ${transaction.description}\nDate: ${new Date(transaction.date).toLocaleString('en-IN')}\nRecorded By: ${transaction.recordedBy}`;
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Transactions History</h2>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by description, name, or amount..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="relative">
          <Filter size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as FilterType)}
            className="pl-10 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white appearance-none cursor-pointer"
          >
            <option value="all">All Transactions</option>
            <option value="deposit">Deposits Only</option>
            <option value="expense">Expenses Only</option>
          </select>
        </div>
      </div>

      {filteredTransactions.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">No transactions found</p>
          <p className="text-sm mt-2">Add your first transaction to get started</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {transaction.type === 'deposit' ? (
                      <ArrowUpCircle size={20} className="text-green-600" />
                    ) : (
                      <ArrowDownCircle size={20} className="text-red-600" />
                    )}
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        transaction.type === 'deposit'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {transaction.type.toUpperCase()}
                    </span>
                  </div>

                  <p className="text-lg font-semibold text-gray-800 mb-1">
                    {transaction.description}
                  </p>

                  <p
                    className={`text-2xl font-bold mb-2 ${
                      transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    ₹{transaction.amount.toFixed(2)}
                  </p>

                  <div className="text-sm text-gray-600">
                    <p>{new Date(transaction.date).toLocaleString('en-IN')}</p>
                    <p className="mt-1">
                      Recorded by: <span className="font-medium">{transaction.recordedBy}</span>
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => copyToClipboard(transaction)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                    title="Copy details"
                  >
                    <Copy size={20} />
                  </button>
                  <button
                    onClick={() => onDelete(transaction.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    title="Delete transaction"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
