import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Calendar, ArrowUp, ArrowDown } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// Sample cash flow data for report
const cashFlowData = [
  {
    category: 'Operating Activities',
    items: [
      { description: 'Cash Receipts from Customers', amount: 250000000 },
      { description: 'Cash Paid to Suppliers', amount: -120000000 },
      { description: 'Cash Paid to Employees', amount: -75000000 },
      { description: 'Interest Paid', amount: -5000000 },
      { description: 'Income Taxes Paid', amount: -15000000 },
    ]
  },
  {
    category: 'Investing Activities',
    items: [
      { description: 'Purchase of Equipment', amount: -35000000 },
      { description: 'Sale of Old Equipment', amount: 10000000 },
      { description: 'Interest Received', amount: 2500000 },
    ]
  },
  {
    category: 'Financing Activities',
    items: [
      { description: 'Proceeds from Loan', amount: 50000000 },
      { description: 'Repayment of Loan', amount: -20000000 },
      { description: 'Dividends Paid', amount: -10000000 },
    ]
  }
];

// Calculate subtotals and totals
const calculatedData = cashFlowData.map(category => {
  const subtotal = category.items.reduce((sum, item) => sum + item.amount, 0);
  return {
    ...category,
    subtotal
  };
});

const totalCashFlow = calculatedData.reduce((sum, category) => sum + category.subtotal, 0);

// Sample chart data for monthly cash flow
const monthlyCashFlowData = [
  { month: 'Jan', inflow: 45000000, outflow: -30000000 },
  { month: 'Feb', inflow: 50000000, outflow: -35000000 },
  { month: 'Mar', inflow: 55000000, outflow: -32000000 },
  { month: 'Apr', inflow: 60000000, outflow: -38000000 },
  { month: 'May', inflow: 58000000, outflow: -40000000 },
  { month: 'Jun', inflow: 62000000, outflow: -42000000 },
  { month: 'Jul', inflow: 65000000, outflow: -45000000 },
  { month: 'Aug', inflow: 67000000, outflow: -44000000 },
  { month: 'Sep', inflow: 70000000, outflow: -48000000 },
  { month: 'Oct', inflow: 72000000, outflow: -50000000 },
  { month: 'Nov', inflow: 75000000, outflow: -52000000 },
  { month: 'Dec', inflow: 80000000, outflow: -55000000 },
];

const CashFlowReport = () => {
  const [period, setPeriod] = useState('current');
  const [view, setView] = useState('report');
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(Math.abs(amount));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex gap-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Current Month</SelectItem>
              <SelectItem value="previous">Previous Month</SelectItem>
              <SelectItem value="quarter">Current Quarter</SelectItem>
              <SelectItem value="ytd">Year to Date</SelectItem>
              <SelectItem value="annual">Annual</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Calendar size={16} />
            Custom Date Range
          </Button>
        </div>
        <div className="flex gap-2">
          <Select value={view} onValueChange={setView}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select view" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="report">Report View</SelectItem>
              <SelectItem value="chart">Chart View</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Download size={16} />
            Export
          </Button>
        </div>
      </div>

      {view === 'report' ? (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Cash Flow Statement</h2>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[60%]">Description</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {calculatedData.map((category, categoryIndex) => (
                  <React.Fragment key={categoryIndex}>
                    <TableRow className="bg-muted/30">
                      <TableCell className="font-bold">{category.category}</TableCell>
                      <TableCell className="text-right"></TableCell>
                    </TableRow>
                    {category.items.map((item, itemIndex) => (
                      <TableRow key={`${categoryIndex}-${itemIndex}`}>
                        <TableCell className="pl-8">{item.description}</TableCell>
                        <TableCell className="text-right font-medium">
                          {formatCurrency(item.amount)}
                          {item.amount < 0 ? ' (-)' : ' (+)'}
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="bg-muted/10">
                      <TableCell className="pl-4 font-medium">Net Cash from {category.category}</TableCell>
                      <TableCell className={`text-right font-bold ${category.subtotal < 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                        {formatCurrency(category.subtotal)}
                        {category.subtotal < 0 ? ' (-)' : ' (+)'}
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
                <TableRow className="bg-muted/50">
                  <TableCell className="font-bold">Net Increase/(Decrease) in Cash</TableCell>
                  <TableCell className={`text-right font-bold text-lg ${totalCashFlow < 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                    {formatCurrency(totalCashFlow)}
                    {totalCashFlow < 0 ? ' (-)' : ' (+)'}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </Card>
      ) : (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Monthly Cash Flow Chart</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyCashFlowData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis 
                  tickFormatter={(value) => 
                    new Intl.NumberFormat('id-ID', {
                      notation: 'compact',
                      compactDisplay: 'short',
                      maximumFractionDigits: 1
                    }).format(value)
                  } 
                />
                <Tooltip 
                  formatter={(value) => [
                    formatCurrency(Math.abs(Number(value))), 
                    Number(value) < 0 ? 'Cash Outflow' : 'Cash Inflow'
                  ]}
                />
                <Legend />
                <Bar dataKey="inflow" name="Cash Inflow" fill="#22c55e" />
                <Bar dataKey="outflow" name="Cash Outflow" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <Card className="p-4 border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950/30">
              <div className="flex items-center gap-2">
                <ArrowUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                <div className="text-sm text-green-600 dark:text-green-400">Total Cash Inflow</div>
              </div>
              <div className="text-2xl font-bold mt-1 text-green-600 dark:text-green-400">
                {formatCurrency(monthlyCashFlowData.reduce((sum, item) => sum + item.inflow, 0))}
              </div>
            </Card>
            <Card className="p-4 border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/30">
              <div className="flex items-center gap-2">
                <ArrowDown className="h-5 w-5 text-red-600 dark:text-red-400" />
                <div className="text-sm text-red-600 dark:text-red-400">Total Cash Outflow</div>
              </div>
              <div className="text-2xl font-bold mt-1 text-red-600 dark:text-red-400">
                {formatCurrency(Math.abs(monthlyCashFlowData.reduce((sum, item) => sum + item.outflow, 0)))}
              </div>
            </Card>
            <Card className="p-4 border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/30">
              <div className="flex items-center gap-2">
                <div className="text-sm text-blue-600 dark:text-blue-400">Net Cash Flow</div>
              </div>
              <div className="text-2xl font-bold mt-1 text-blue-600 dark:text-blue-400">
                {formatCurrency(monthlyCashFlowData.reduce((sum, item) => sum + item.inflow + item.outflow, 0))}
              </div>
            </Card>
          </div>
        </Card>
      )}
    </div>
  );
};

export default CashFlowReport;
