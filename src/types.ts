export interface Transaction {
  id: string;
  type: 'deposit' | 'expense';
  amount: number;
  description: string;
  date: string;
  recordedBy: string;
}

export type FilterType = 'all' | 'deposit' | 'expense';
