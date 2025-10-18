import { Wallet } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-gradient-to-r from-teal-500 to-blue-600 text-white py-8 px-4 shadow-lg">
      <div className="max-w-7xl mx-auto text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <Wallet size={40} className="animate-pulse" />
          <h1 className="text-4xl font-bold">Our Room Wallet</h1>
        </div>
        <p className="text-blue-100 text-lg">Simple way to manage shared money</p>
      </div>
    </header>
  );
}
