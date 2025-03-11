import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Calendar, Download, Plus } from 'lucide-react';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

// Sample journal entries data
const journalEntries = [
  {
    id: 'JE001',
    date: '2023-06-15',
    reference: 'INV-2023-0056',
    description: 'Sales Invoice Payment',
    debit: 5000000,
    credit: 5000000,
    status: 'posted'
  },
  {
    id: 'JE002',
    date: '2023-06-18',
    reference: 'PO-2023-0078',
    description: 'Purchase of Office Supplies',
    debit: 750000,
    credit: 750000,
    status: 'posted'
  },
  {
    id: 'JE003',
    date: '2023-06-20',
    reference: 'ADJ-2023-0012',
    description: 'Salary Payment - June 2023',
    debit: 12000000,
    credit: 12000000,
    status: 'posted'
  },
  {
    id: 'JE004',
    date: '2023-06-25',
    reference: 'DEP-2023-0034',
    description: 'Monthly Depreciation',
    debit: 2500000,
    credit: 2500000,
    status: 'posted'
  },
  {
    id: 'JE005',
    date: '2023-06-30',
    reference: 'UTIL-2023-0008',
    description: 'Utility Bills Payment',
    debit: 3500000,
    credit: 3500000,
    status: 'draft'
  }
];

const GeneralJournal = () => {
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
                placeholder="Search journal entries..."
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
              New Entry
            </Button>
          </div>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Entry No.</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Reference</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Debit</TableHead>
                <TableHead className="text-right">Credit</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {journalEntries.map((entry) => (
                <TableRow key={entry.id} className="cursor-pointer hover:bg-muted/80">
                  <TableCell className="font-medium">{entry.id}</TableCell>
                  <TableCell>{entry.date}</TableCell>
                  <TableCell>{entry.reference}</TableCell>
                  <TableCell>{entry.description}</TableCell>
                  <TableCell className="text-right">{formatCurrency(entry.debit)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(entry.credit)}</TableCell>
                  <TableCell>
                    <Badge variant={entry.status === 'posted' ? 'default' : 'secondary'}>
                      {entry.status === 'posted' ? 'Posted' : 'Draft'}
                    </Badge>
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

export default GeneralJournal;
