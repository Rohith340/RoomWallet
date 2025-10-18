import { useState } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { AddTransaction } from './components/AddTransaction';
import { TransactionsList } from './components/TransactionsList';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Transaction } from './types';

function App() {
  const [managerName, setManagerName] = useLocalStorage<string>('roomWalletManager', '');
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>('roomWalletTransactions', []);

  const handleAddTransaction = (type: 'deposit' | 'expense', amount: number, description: string) => {
    const newTransaction: Transaction = {
      id: crypto.randomUUID(),
      type,
      amount,
      description,
      date: new Date().toISOString(),
      recordedBy: managerName || 'Anonymous',
    };

    setTransactions([...transactions, newTransaction]);
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const handleClearAll = () => {
    setTransactions([]);
    setManagerName('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Dashboard
              managerName={managerName}
              onManagerNameChange={setManagerName}
              transactions={transactions}
            />

            <AddTransaction onAdd={handleAddTransaction} />

            <TransactionsList
              transactions={transactions}
              onDelete={handleDeleteTransaction}
            />
          </div>

          <div className="lg:col-span-1">
            <Sidebar
              transactions={transactions}
              onClearAll={handleClearAll}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
