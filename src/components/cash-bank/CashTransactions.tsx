import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Calendar, Download, Plus, Eye } from 'lucide-react';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

// Sample transactions data
const transactions = [
  {
    id: 'TX001',
    date: '2023-06-15',
    account: 'Main Petty Cash',
    type: 'Cash In',
    reference: 'REF-0056',
    description: 'Petty Cash Replenishment',
    amount: 2000000,
    currency: 'IDR',
    status: 'completed'
  },
  {
    id: 'TX002',
    date: '2023-06-18',
    account: 'Office Supplies Cash',
    type: 'Cash Out',
    reference: 'REF-0078',
    description: 'Purchase of Office Supplies',
    amount: 500000,
    currency: 'IDR',
    status: 'completed'
  },
  {
    id: 'TX003',
    date: '2023-06-20',
    account: 'Main Operating Account',
    type: 'Bank In',
    reference: 'REF-0082',
    description: 'Customer Payment - Invoice #12345',
    amount: 15000000,
    currency: 'IDR',
    status: 'completed'
  },
  {
    id: 'TX004',
    date: '2023-06-25',
    account: 'Payroll Account',
    type: 'Bank Out',
    reference: 'REF-0090',
    description: 'Salary Payment - June 2023',
    amount: 25000000,
    currency: 'IDR',
    status: 'completed'
  },
  {
    id: 'TX005',
    date: '2023-06-30',
    account: 'Tax Payment Account',
    type: 'Bank Out',
    reference: 'REF-0098',
    description: 'Monthly Tax Payment',
    amount: 5000000,
    currency: 'IDR',
    status: 'pending'
  },
  {
    id: 'TX006',
    date: '2023-06-30',
    account: 'Marketing Events Cash',
    type: 'Transfer',
    reference: 'REF-0099',
    description: 'Transfer to Branch Office Jakarta',
    amount: 1500000,
    currency: 'IDR',
    status: 'completed'
  }
];

const CashTransactions = () => {
  const [search, setSearch] = useState('');
  
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'completed':
        return 'default';
      case 'pending':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Cash In':
      case 'Bank In':
        return 'text-green-600 dark:text-green-400';
      case 'Cash Out':
      case 'Bank Out':
        return 'text-red-600 dark:text-red-400';
      case 'Transfer':
        return 'text-blue-600 dark:text-blue-400';
      default:
        return '';
    }
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
                placeholder="Search transactions..."
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
            <Button className="gap-2">
              <Plus size={16} />
              New Transaction
            </Button>
          </div>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Account</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Reference</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id} className="cursor-pointer hover:bg-muted/80">
                  <TableCell className="font-medium">{transaction.id}</TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.account}</TableCell>
                  <TableCell className={getTypeColor(transaction.type)}>{transaction.type}</TableCell>
                  <TableCell>{transaction.reference}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell className={`text-right font-medium ${getTypeColor(transaction.type)}`}>
                    {formatCurrency(transaction.amount, transaction.currency)}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(transaction.status)}>
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" title="View Transaction Details">
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

export default CashTransactions;
