import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Calendar, Download, PlusCircle, ArrowUpDown, Eye } from 'lucide-react';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

// Sample ledger accounts data
const ledgerAccounts = [
  {
    id: '1-1000',
    name: 'Cash in Hand',
    category: 'Asset',
    type: 'Cash & Bank',
    debit: 25000000,
    credit: 5000000,
    balance: 20000000,
  },
  {
    id: '1-1100',
    name: 'Bank Account',
    category: 'Asset',
    type: 'Cash & Bank',
    debit: 150000000,
    credit: 65000000,
    balance: 85000000,
  },
  {
    id: '1-2000',
    name: 'Accounts Receivable',
    category: 'Asset',
    type: 'Receivable',
    debit: 45000000,
    credit: 15000000,
    balance: 30000000,
  },
  {
    id: '1-3000',
    name: 'Inventory',
    category: 'Asset',
    type: 'Inventory',
    debit: 75000000,
    credit: 35000000,
    balance: 40000000,
  },
  {
    id: '2-1000',
    name: 'Accounts Payable',
    category: 'Liability',
    type: 'Payable',
    debit: 10000000,
    credit: 45000000,
    balance: -35000000,
  },
  {
    id: '3-1000',
    name: 'Common Stock',
    category: 'Equity',
    type: 'Capital',
    debit: 0,
    credit: 100000000,
    balance: -100000000,
  },
  {
    id: '4-1000',
    name: 'Sales Revenue',
    category: 'Revenue',
    type: 'Operating Revenue',
    debit: 0,
    credit: 250000000,
    balance: -250000000,
  },
  {
    id: '5-1000',
    name: 'Cost of Goods Sold',
    category: 'Expense',
    type: 'Cost of Sales',
    debit: 150000000,
    credit: 0,
    balance: 150000000,
  },
  {
    id: '5-2000',
    name: 'Salary Expense',
    category: 'Expense',
    type: 'Operating Expense',
    debit: 60000000,
    credit: 0,
    balance: 60000000,
  }
];

const LedgerAccounts = () => {
  const [search, setSearch] = useState('');
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-4">
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
          <div className="flex gap-2 flex-1">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search ledger accounts..."
                className="pl-8"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter size={16} />
              Filter
            </Button>
            <Button variant="outline" className="gap-2">
              <Calendar size={16} />
              Date Range
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download size={16} />
              Export
            </Button>
          </div>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Account Code</TableHead>
                <TableHead>Account Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Debit</TableHead>
                <TableHead className="text-right">Credit</TableHead>
                <TableHead className="text-right">Balance</TableHead>
                <TableHead className="w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ledgerAccounts.map((account) => (
                <TableRow key={account.id} className="cursor-pointer hover:bg-muted/80">
                  <TableCell className="font-medium">{account.id}</TableCell>
                  <TableCell>{account.name}</TableCell>
                  <TableCell>{account.category}</TableCell>
                  <TableCell>{account.type}</TableCell>
                  <TableCell className="text-right">{formatCurrency(account.debit)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(account.credit)}</TableCell>
                  <TableCell className={`text-right font-medium ${account.balance < 0 ? 'text-destructive' : ''}`}>
                    {formatCurrency(Math.abs(account.balance))}
                    {account.balance < 0 ? ' (Cr)' : ' (Dr)'}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" title="View Account Details">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default LedgerAccounts;
