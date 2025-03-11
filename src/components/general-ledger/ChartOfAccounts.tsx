import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Download, Plus, Edit, Trash2 } from 'lucide-react';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

// Sample chart of accounts data
const accountsList = [
  {
    id: '1-0000',
    name: 'Assets',
    type: 'Header',
    isActive: true,
    subAccounts: [
      { id: '1-1000', name: 'Cash in Hand', type: 'Detail', isActive: true },
      { id: '1-1100', name: 'Bank Account', type: 'Detail', isActive: true },
      { id: '1-2000', name: 'Accounts Receivable', type: 'Detail', isActive: true },
      { id: '1-3000', name: 'Inventory', type: 'Detail', isActive: true },
      { id: '1-4000', name: 'Prepaid Expenses', type: 'Detail', isActive: true },
      { id: '1-5000', name: 'Fixed Assets', type: 'Header', isActive: true },
      { id: '1-5100', name: 'Equipment', type: 'Detail', isActive: true },
      { id: '1-5200', name: 'Accumulated Depreciation', type: 'Detail', isActive: true },
    ]
  },
  {
    id: '2-0000',
    name: 'Liabilities',
    type: 'Header',
    isActive: true,
    subAccounts: [
      { id: '2-1000', name: 'Accounts Payable', type: 'Detail', isActive: true },
      { id: '2-2000', name: 'Accrued Expenses', type: 'Detail', isActive: true },
      { id: '2-3000', name: 'Short-term Loans', type: 'Detail', isActive: true },
      { id: '2-4000', name: 'Long-term Liabilities', type: 'Header', isActive: true },
      { id: '2-4100', name: 'Mortgage Payable', type: 'Detail', isActive: true },
    ]
  },
  {
    id: '3-0000',
    name: 'Equity',
    type: 'Header',
    isActive: true,
    subAccounts: [
      { id: '3-1000', name: 'Common Stock', type: 'Detail', isActive: true },
      { id: '3-2000', name: 'Retained Earnings', type: 'Detail', isActive: true },
      { id: '3-3000', name: 'Dividends Paid', type: 'Detail', isActive: true },
    ]
  },
  {
    id: '4-0000',
    name: 'Revenue',
    type: 'Header',
    isActive: true,
    subAccounts: [
      { id: '4-1000', name: 'Sales Revenue', type: 'Detail', isActive: true },
      { id: '4-2000', name: 'Service Revenue', type: 'Detail', isActive: true },
      { id: '4-3000', name: 'Interest Income', type: 'Detail', isActive: true },
      { id: '4-4000', name: 'Other Income', type: 'Detail', isActive: true },
    ]
  },
  {
    id: '5-0000',
    name: 'Expenses',
    type: 'Header',
    isActive: true,
    subAccounts: [
      { id: '5-1000', name: 'Cost of Goods Sold', type: 'Detail', isActive: true },
      { id: '5-2000', name: 'Salary Expense', type: 'Detail', isActive: true },
      { id: '5-3000', name: 'Rent Expense', type: 'Detail', isActive: true },
      { id: '5-4000', name: 'Utilities Expense', type: 'Detail', isActive: true },
      { id: '5-5000', name: 'Depreciation Expense', type: 'Detail', isActive: true },
      { id: '5-6000', name: 'Office Supplies', type: 'Detail', isActive: true },
      { id: '5-7000', name: 'Marketing & Advertising', type: 'Detail', isActive: true },
    ]
  }
];

const ChartOfAccounts = () => {
  const [search, setSearch] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<string[]>(accountsList.map(cat => cat.id));
  
  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
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
                placeholder="Search accounts..."
                className="pl-8"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download size={16} />
              Export
            </Button>
            <Button className="gap-2">
              <Plus size={16} />
              New Account
            </Button>
          </div>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Account Code</TableHead>
                <TableHead>Account Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accountsList.map((category) => (
                <React.Fragment key={category.id}>
                  <TableRow 
                    className="cursor-pointer hover:bg-muted/80 bg-muted/30"
                    onClick={() => toggleCategory(category.id)}
                  >
                    <TableCell className="font-semibold">{category.id}</TableCell>
                    <TableCell className="font-semibold">{category.name}</TableCell>
                    <TableCell>{category.type}</TableCell>
                    <TableCell>
                      <Badge variant={category.isActive ? "default" : "secondary"}>
                        {category.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" title="Edit Account">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Delete Account">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  
                  {expandedCategories.includes(category.id) && category.subAccounts.map((account) => (
                    <TableRow key={account.id} className="cursor-pointer hover:bg-muted/80">
                      <TableCell className="pl-8 font-medium">{account.id}</TableCell>
                      <TableCell className="pl-8">{account.name}</TableCell>
                      <TableCell>{account.type}</TableCell>
                      <TableCell>
                        <Badge variant={account.isActive ? "default" : "secondary"}>
                          {account.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" title="Edit Account">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" title="Delete Account">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default ChartOfAccounts;
