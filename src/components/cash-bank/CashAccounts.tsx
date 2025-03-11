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

// Sample cash accounts data
const cashAccounts = [
  {
    id: 'CA001',
    name: 'Main Petty Cash',
    balance: 5000000,
    currency: 'IDR',
    custodian: 'Budi Santoso',
    location: 'Head Office',
    status: 'active'
  },
  {
    id: 'CA002',
    name: 'Office Supplies Cash',
    balance: 2500000,
    currency: 'IDR',
    custodian: 'Dewi Anggraini',
    location: 'Head Office',
    status: 'active'
  },
  {
    id: 'CA003',
    name: 'Marketing Events Cash',
    balance: 7500000,
    currency: 'IDR',
    custodian: 'Arief Wicaksono',
    location: 'Head Office',
    status: 'active'
  },
  {
    id: 'CA004',
    name: 'Branch Office Jakarta',
    balance: 3500000,
    currency: 'IDR',
    custodian: 'Siti Rahayu',
    location: 'Jakarta Branch',
    status: 'active'
  },
  {
    id: 'CA005',
    name: 'Branch Office Surabaya',
    balance: 3000000,
    currency: 'IDR',
    custodian: 'Eko Prasetyo',
    location: 'Surabaya Branch',
    status: 'active'
  },
  {
    id: 'CA006',
    name: 'USD Petty Cash',
    balance: 500,
    currency: 'USD',
    custodian: 'Budi Santoso',
    location: 'Head Office',
    status: 'inactive'
  }
];

const CashAccounts = () => {
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
                placeholder="Search cash accounts..."
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
              New Cash Account
            </Button>
          </div>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Custodian</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-right">Balance</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cashAccounts.map((account) => (
                <TableRow key={account.id} className="cursor-pointer hover:bg-muted/80">
                  <TableCell className="font-medium">{account.id}</TableCell>
                  <TableCell>{account.name}</TableCell>
                  <TableCell>{account.custodian}</TableCell>
                  <TableCell>{account.location}</TableCell>
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

export default CashAccounts;
