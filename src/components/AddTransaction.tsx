import { useState } from 'react';
import { Plus, RotateCcw } from 'lucide-react';

interface AddTransactionProps {
  onAdd: (type: 'deposit' | 'expense', amount: number, description: string) => void;
}

export function AddTransaction({ onAdd }: AddTransactionProps) {
  const [type, setType] = useState<'deposit' | 'expense'>('deposit');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(amount);

    if (amountNum > 0 && description.trim()) {
      onAdd(type, amountNum, description.trim());
      handleReset();
    }
  };

  const handleReset = () => {
    setAmount('');
    setDescription('');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Plus size={24} className="text-teal-600" />
        Add Transaction
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type
          </label>
          <div className="flex gap-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                value="deposit"
                checked={type === 'deposit'}
                onChange={(e) => setType(e.target.value as 'deposit' | 'expense')}
                className="mr-2"
              />
              <span className="px-4 py-2 rounded-md bg-green-100 text-green-700 font-medium">
                Deposit
              </span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                value="expense"
                checked={type === 'expense'}
                onChange={(e) => setType(e.target.value as 'deposit' | 'expense')}
                className="mr-2"
              />
              <span className="px-4 py-2 rounded-md bg-red-100 text-red-700 font-medium">
                Expense
              </span>
            </label>
          </div>
        </div>

        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
            Amount (₹)
          </label>
          <input
            id="amount"
            type="number"
            step="0.01"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Enter amount"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="E.g., Electricity Bill"
            required
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 transition-colors font-medium flex items-center justify-center gap-2"
          >
            <Plus size={20} />
            Save
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-6 bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 transition-colors font-medium flex items-center justify-center gap-2"
          >
            <RotateCcw size={20} />
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
