import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Download, 
  Printer, 
  FileBarChart, 
  ArrowDownUp, 
  Calendar,
  Filter
} from 'lucide-react';

// Sample balance sheet data
const balanceSheetData = {
  assets: [
    { name: 'Current Assets', amount: 175000000, isHeader: true },
    { name: 'Cash in Hand', amount: 20000000, isHeader: false },
    { name: 'Bank Account', amount: 85000000, isHeader: false },
    { name: 'Accounts Receivable', amount: 30000000, isHeader: false },
    { name: 'Inventory', amount: 40000000, isHeader: false },
    { name: 'Fixed Assets', amount: 325000000, isHeader: true },
    { name: 'Equipment', amount: 125000000, isHeader: false },
    { name: 'Buildings', amount: 250000000, isHeader: false },
    { name: 'Accumulated Depreciation', amount: -50000000, isHeader: false },
  ],
  liabilities: [
    { name: 'Current Liabilities', amount: 95000000, isHeader: true },
    { name: 'Accounts Payable', amount: 35000000, isHeader: false },
    { name: 'Accrued Expenses', amount: 25000000, isHeader: false },
    { name: 'Short-term Loans', amount: 35000000, isHeader: false },
    { name: 'Long-term Liabilities', amount: 120000000, isHeader: true },
    { name: 'Mortgage Payable', amount: 120000000, isHeader: false },
  ],
  equity: [
    { name: 'Equity', amount: 285000000, isHeader: true },
    { name: 'Common Stock', amount: 100000000, isHeader: false },
    { name: 'Retained Earnings', amount: 185000000, isHeader: false },
  ]
};

// Sample income statement data
const incomeStatementData = {
  revenue: [
    { name: 'Operating Revenue', amount: 580000000, isHeader: true },
    { name: 'Sales Revenue', amount: 450000000, isHeader: false },
    { name: 'Service Revenue', amount: 130000000, isHeader: false },
    { name: 'Other Revenue', amount: 20000000, isHeader: true },
    { name: 'Interest Income', amount: 5000000, isHeader: false },
    { name: 'Other Income', amount: 15000000, isHeader: false },
  ],
  expenses: [
    { name: 'Cost of Sales', amount: 280000000, isHeader: true },
    { name: 'Cost of Goods Sold', amount: 250000000, isHeader: false },
    { name: 'Direct Labor', amount: 30000000, isHeader: false },
    { name: 'Operating Expenses', amount: 185000000, isHeader: true },
    { name: 'Salary Expense', amount: 80000000, isHeader: false },
    { name: 'Rent Expense', amount: 35000000, isHeader: false },
    { name: 'Utilities Expense', amount: 15000000, isHeader: false },
    { name: 'Depreciation Expense', amount: 25000000, isHeader: false },
    { name: 'Office Supplies', amount: 10000000, isHeader: false },
    { name: 'Marketing & Advertising', amount: 20000000, isHeader: false },
  ]
};

const FinancialReports = () => {
  const [reportPeriod, setReportPeriod] = useState('June 2023');
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const totalAssets = balanceSheetData.assets.reduce((sum, item) => 
    !item.isHeader ? sum + item.amount : sum, 0
  );
  
  const totalLiabilities = balanceSheetData.liabilities.reduce((sum, item) => 
    !item.isHeader ? sum + item.amount : sum, 0
  );
  
  const totalEquity = balanceSheetData.equity.reduce((sum, item) => 
    !item.isHeader ? sum + item.amount : sum, 0
  );

  const totalRevenue = incomeStatementData.revenue.reduce((sum, item) => 
    !item.isHeader ? sum + item.amount : sum, 0
  );
  
  const totalExpenses = incomeStatementData.expenses.reduce((sum, item) => 
    !item.isHeader ? sum + item.amount : sum, 0
  );
  
  const netIncome = totalRevenue - totalExpenses;

  return (
    <div className="space-y-4">
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold mb-1">Financial Reports</h3>
            <p className="text-sm text-muted-foreground">Period: {reportPeriod}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Calendar size={16} />
              Change Period
            </Button>
            <Button variant="outline" className="gap-2">
              <Filter size={16} />
              Filter
            </Button>
            <Button variant="outline" className="gap-2">
              <Download size={16} />
              Export
            </Button>
            <Button variant="outline" className="gap-2">
              <Printer size={16} />
              Print
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="balanceSheet" className="space-y-4">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="balanceSheet" className="gap-2">
              <FileText size={16} />
              Balance Sheet
            </TabsTrigger>
            <TabsTrigger value="incomeStatement" className="gap-2">
              <FileBarChart size={16} />
              Income Statement
            </TabsTrigger>
            <TabsTrigger value="cashFlow" className="gap-2">
              <ArrowDownUp size={16} />
              Cash Flow
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="balanceSheet" className="space-y-4">
            <div className="rounded-md border p-4">
              <h2 className="text-xl font-semibold text-center mb-4">Balance Sheet</h2>
              <h3 className="text-sm text-muted-foreground text-center mb-6">As of {reportPeriod}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Assets Column */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Assets</h3>
                  <table className="w-full">
                    <tbody>
                      {balanceSheetData.assets.map((item, index) => (
                        <tr key={index} className={`${item.isHeader ? 'font-semibold' : ''}`}>
                          <td className={`py-1 ${item.isHeader ? '' : 'pl-4'}`}>{item.name}</td>
                          <td className="py-1 text-right">
                            {formatCurrency(item.amount)}
                          </td>
                        </tr>
                      ))}
                      <tr className="font-bold border-t">
                        <td className="py-2">Total Assets</td>
                        <td className="py-2 text-right">{formatCurrency(totalAssets)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                {/* Liabilities & Equity Column */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Liabilities</h3>
                  <table className="w-full">
                    <tbody>
                      {balanceSheetData.liabilities.map((item, index) => (
                        <tr key={index} className={`${item.isHeader ? 'font-semibold' : ''}`}>
                          <td className={`py-1 ${item.isHeader ? '' : 'pl-4'}`}>{item.name}</td>
                          <td className="py-1 text-right">
                            {formatCurrency(item.amount)}
                          </td>
                        </tr>
                      ))}
                      <tr className="font-bold border-t">
                        <td className="py-2">Total Liabilities</td>
                        <td className="py-2 text-right">{formatCurrency(totalLiabilities)}</td>
                      </tr>
                    </tbody>
                  </table>
                  
                  <h3 className="text-lg font-semibold mb-4 mt-6">Equity</h3>
                  <table className="w-full">
                    <tbody>
                      {balanceSheetData.equity.map((item, index) => (
                        <tr key={index} className={`${item.isHeader ? 'font-semibold' : ''}`}>
                          <td className={`py-1 ${item.isHeader ? '' : 'pl-4'}`}>{item.name}</td>
                          <td className="py-1 text-right">
                            {formatCurrency(item.amount)}
                          </td>
                        </tr>
                      ))}
                      <tr className="font-bold border-t">
                        <td className="py-2">Total Equity</td>
                        <td className="py-2 text-right">{formatCurrency(totalEquity)}</td>
                      </tr>
                    </tbody>
                  </table>
                  
                  <div className="mt-6 pt-4 border-t-2">
                    <div className="flex justify-between font-bold">
                      <span>Total Liabilities & Equity</span>
                      <span>{formatCurrency(totalLiabilities + totalEquity)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="incomeStatement" className="space-y-4">
            <div className="rounded-md border p-4">
              <h2 className="text-xl font-semibold text-center mb-4">Income Statement</h2>
              <h3 className="text-sm text-muted-foreground text-center mb-6">For the period ending {reportPeriod}</h3>
              
              <div className="max-w-2xl mx-auto">
                {/* Revenue Section */}
                <h3 className="text-lg font-semibold mb-4">Revenue</h3>
                <table className="w-full mb-6">
                  <tbody>
                    {incomeStatementData.revenue.map((item, index) => (
                      <tr key={index} className={`${item.isHeader ? 'font-semibold' : ''}`}>
                        <td className={`py-1 ${item.isHeader ? '' : 'pl-4'}`}>{item.name}</td>
                        <td className="py-1 text-right">
                          {formatCurrency(item.amount)}
                        </td>
                      </tr>
                    ))}
                    <tr className="font-bold border-t">
                      <td className="py-2">Total Revenue</td>
                      <td className="py-2 text-right">{formatCurrency(totalRevenue)}</td>
                    </tr>
                  </tbody>
                </table>
                
                {/* Expenses Section */}
                <h3 className="text-lg font-semibold mb-4">Expenses</h3>
                <table className="w-full mb-6">
                  <tbody>
                    {incomeStatementData.expenses.map((item, index) => (
                      <tr key={index} className={`${item.isHeader ? 'font-semibold' : ''}`}>
                        <td className={`py-1 ${item.isHeader ? '' : 'pl-4'}`}>{item.name}</td>
                        <td className="py-1 text-right">
                          {formatCurrency(item.amount)}
                        </td>
                      </tr>
                    ))}
                    <tr className="font-bold border-t">
                      <td className="py-2">Total Expenses</td>
                      <td className="py-2 text-right">{formatCurrency(totalExpenses)}</td>
                    </tr>
                  </tbody>
                </table>
                
                {/* Net Income */}
                <div className="mt-6 pt-4 border-t-2">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Net Income</span>
                    <span>{formatCurrency(netIncome)}</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="cashFlow" className="space-y-4">
            <div className="rounded-md border p-4">
              <h2 className="text-xl font-semibold text-center mb-4">Cash Flow Statement</h2>
              <h3 className="text-sm text-muted-foreground text-center mb-6">For the period ending {reportPeriod}</h3>
              
              <div className="flex items-center justify-center h-40">
                <p className="text-muted-foreground">Cash Flow Statement is under development.</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default FinancialReports;
