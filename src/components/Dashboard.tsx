import { Transaction } from '../types';
import { User, TrendingUp } from 'lucide-react';

interface DashboardProps {
  managerName: string;
  onManagerNameChange: (name: string) => void;
  transactions: Transaction[];
}

export function Dashboard({ managerName, onManagerNameChange, transactions }: DashboardProps) {
  const balance = transactions.reduce((acc, transaction) => {
    return transaction.type === 'deposit'
      ? acc + transaction.amount
      : acc - transaction.amount;
  }, 0);

  const totalTransactions = transactions.length;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <User size={20} className="text-teal-600" />
        <label htmlFor="managerName" className="text-sm font-medium text-gray-700">
          Manager Name:
        </label>
        <input
          id="managerName"
          type="text"
          value={managerName}
          onChange={(e) => onManagerNameChange(e.target.value)}
          className="flex-1 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="Enter your name"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-teal-50 to-blue-50 p-6 rounded-lg border-2 border-teal-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Current Balance</h3>
            <TrendingUp size={20} className="text-teal-600" />
          </div>
          <p className={`text-3xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ₹{balance.toFixed(2)}
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg border-2 border-blue-200">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Total Transactions</h3>
          <p className="text-3xl font-bold text-blue-600">{totalTransactions}</p>
        </div>
      </div>
    </div>
  );
}
