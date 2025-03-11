import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Download, Plus, Eye } from 'lucide-react';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

// Sample bank accounts data
const bankAccounts = [
  {
    id: 'BA001',
    accountNumber: '1234567890',
    name: 'Main Operating Account',
    bank: 'Bank BCA',
    branch: 'Jakarta Pusat',
    currency: 'IDR',
    balance: 125000000,
    status: 'active'
  },
  {
    id: 'BA002',
    accountNumber: '0987654321',
    name: 'Payroll Account',
    bank: 'Bank Mandiri',
    branch: 'Jakarta Selatan',
    currency: 'IDR',
    balance: 75000000,
    status: 'active'
  },
  {
    id: 'BA003',
    accountNumber: '1122334455',
    name: 'Tax Payment Account',
    bank: 'Bank BNI',
    branch: 'Jakarta Pusat',
    currency: 'IDR',
    balance: 35000000,
    status: 'active'
  },
  {
    id: 'BA004',
    accountNumber: '5544332211',
    name: 'USD Operating Account',
    bank: 'Bank BCA',
    branch: 'Jakarta Pusat',
    currency: 'USD',
    balance: 50000,
    status: 'active'
  },
  {
    id: 'BA005',
    accountNumber: '6677889900',
    name: 'Investment Account',
    bank: 'Bank BRI',
    branch: 'Jakarta Timur',
    currency: 'IDR',
    balance: 250000000,
    status: 'active'
  },
  {
    id: 'BA006',
    accountNumber: '1357924680',
    name: 'Old Operating Account',
    bank: 'Bank Danamon',
    branch: 'Jakarta Barat',
    currency: 'IDR',
    balance: 15000000,
    status: 'inactive'
  }
];

const BankAccounts = () => {
  const [search, setSearch] = useState('');
  
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: currency,
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
                placeholder="Search bank accounts..."
                className="pl-8"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter size={16} />
              Filter
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download size={16} />
              Export
            </Button>
            <Button className="gap-2">
              <Plus size={16} />
              New Bank Account
            </Button>
          </div>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Account Number</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Bank</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead className="text-right">Balance</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bankAccounts.map((account) => (
                <TableRow key={account.id} className="cursor-pointer hover:bg-muted/80">
                  <TableCell className="font-medium">{account.id}</TableCell>
                  <TableCell>{account.accountNumber}</TableCell>
                  <TableCell>{account.name}</TableCell>
                  <TableCell>{account.bank}</TableCell>
                  <TableCell>{account.branch}</TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(account.balance, account.currency)}
                  </TableCell>
                  <TableCell>
                    <Badge variant={account.status === 'active' ? 'default' : 'secondary'}>
                      {account.status === 'active' ? 'Active' : 'Inactive'}
                    </Badge>
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

export default BankAccounts;
