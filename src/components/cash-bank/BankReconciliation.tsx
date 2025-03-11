import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Calendar, Download, Plus, CheckCircle2, XCircle } from 'lucide-react';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Sample bank accounts for filtering
const accounts = [
  { id: 'BA001', name: 'Main Operating Account - Bank BCA' },
  { id: 'BA002', name: 'Payroll Account - Bank Mandiri' },
  { id: 'BA003', name: 'Tax Payment Account - Bank BNI' },
  { id: 'BA004', name: 'USD Operating Account - Bank BCA' },
  { id: 'BA005', name: 'Investment Account - Bank BRI' },
];

// Sample reconciliation transactions
const reconciliationItems = [
  {
    id: 'RT001',
    date: '2023-06-15',
    description: 'Customer Payment - PT Maju Jaya',
    reference: 'INV-2023-0056',
    bankAmount: 5000000,
    bookAmount: 5000000,
    difference: 0,
    status: 'reconciled'
  },
  {
    id: 'RT002',
    date: '2023-06-18',
    description: 'Supplier Payment - PT Abadi Sejahtera',
    reference: 'PO-2023-0078',
    bankAmount: 7500000,
    bookAmount: 7500000,
    difference: 0,
    status: 'reconciled'
  },
  {
    id: 'RT003',
    date: '2023-06-20',
    description: 'Bank Service Fee',
    reference: 'BANK-FEE-125',
    bankAmount: 150000,
    bookAmount: 0,
    difference: 150000,
    status: 'unreconciled'
  },
  {
    id: 'RT004',
    date: '2023-06-25',
    description: 'Interest Income',
    reference: 'INT-2023-062',
    bankAmount: 250000,
    bookAmount: 0,
    difference: 250000,
    status: 'unreconciled'
  },
  {
    id: 'RT005',
    date: '2023-06-28',
    description: 'Cheque Payment - Operational Expense',
    reference: 'CHQ-2023-087',
    bankAmount: 0,
    bookAmount: 3500000,
    difference: -3500000,
    status: 'unreconciled'
  },
  {
    id: 'RT006',
    date: '2023-06-30',
    description: 'Salary Payment - Finance Department',
    reference: 'PAY-2023-F062',
    bankAmount: 15000000,
    bookAmount: 15000000,
    difference: 0,
    status: 'reconciled'
  }
];

const BankReconciliation = () => {
  const [search, setSearch] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('BA001');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Filter items based on search, account, and status
  const filteredItems = reconciliationItems.filter(item => {
    const matchesSearch = item.description.toLowerCase().includes(search.toLowerCase()) || 
                         item.reference.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Calculate summary statistics
  const summary = {
    total: filteredItems.length,
    reconciled: filteredItems.filter(item => item.status === 'reconciled').length,
    unreconciled: filteredItems.filter(item => item.status === 'unreconciled').length,
    bankTotal: filteredItems.reduce((sum, item) => sum + item.bankAmount, 0),
    bookTotal: filteredItems.reduce((sum, item) => sum + item.bookAmount, 0),
    differenceTotal: filteredItems.reduce((sum, item) => sum + item.difference, 0)
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Total Transactions</div>
          <div className="text-2xl font-bold mt-1">{summary.total}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Reconciled</div>
          <div className="text-2xl font-bold mt-1 text-green-600 dark:text-green-400">{summary.reconciled}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Unreconciled</div>
          <div className="text-2xl font-bold mt-1 text-amber-600 dark:text-amber-400">{summary.unreconciled}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Total Difference</div>
          <div className={`text-2xl font-bold mt-1 ${summary.differenceTotal !== 0 ? 'text-red-600 dark:text-red-400' : ''}`}>
            {formatCurrency(Math.abs(summary.differenceTotal))}
            {summary.differenceTotal < 0 ? ' (-)' : summary.differenceTotal > 0 ? ' (+)' : ''}
          </div>
        </Card>
      </div>

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
            <Select value={selectedAccount} onValueChange={setSelectedAccount}>
              <SelectTrigger className="w-[220px]">
                <SelectValue placeholder="Select account" />
              </SelectTrigger>
              <SelectContent>
                {accounts.map(account => (
                  <SelectItem key={account.id} value={account.id}>{account.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="reconciled">Reconciled</SelectItem>
                <SelectItem value="unreconciled">Unreconciled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Calendar size={16} />
              Select Period
            </Button>
            <Button className="gap-2">
              <Plus size={16} />
              Reconcile
            </Button>
          </div>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Reference</TableHead>
                <TableHead className="text-right">Bank Amount</TableHead>
                <TableHead className="text-right">Book Amount</TableHead>
                <TableHead className="text-right">Difference</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((item) => (
                <TableRow key={item.id} className="cursor-pointer hover:bg-muted/80">
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.reference}</TableCell>
                  <TableCell className="text-right">{formatCurrency(item.bankAmount)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(item.bookAmount)}</TableCell>
                  <TableCell className={`text-right font-medium ${item.difference !== 0 ? 'text-red-600 dark:text-red-400' : ''}`}>
                    {formatCurrency(Math.abs(item.difference))}
                    {item.difference < 0 ? ' (-)' : item.difference > 0 ? ' (+)' : ''}
                  </TableCell>
                  <TableCell>
                    <Badge variant={item.status === 'reconciled' ? 'default' : 'secondary'}>
                      {item.status === 'reconciled' ? 'Reconciled' : 'Unreconciled'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      title={item.status === 'reconciled' ? 'Reconciled' : 'Reconcile'}
                      className={item.status === 'reconciled' ? 'text-green-600 dark:text-green-400' : ''}
                    >
                      {item.status === 'reconciled' ? 
                        <CheckCircle2 className="h-4 w-4" /> : 
                        <XCircle className="h-4 w-4" />}
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

export default BankReconciliation;
