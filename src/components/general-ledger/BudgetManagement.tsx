import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  ChevronDown, 
  ChevronUp, 
  Download, 
  Filter, 
  Plus, 
  Edit,
  BarChart3,
  TrendingUp
} from 'lucide-react';
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

// Sample budget data
const budgetData = [
  {
    id: 'BG2023-01',
    accountCode: '4-1000',
    accountName: 'Sales Revenue',
    budgetAmount: 500000000,
    actualAmount: 450000000,
    variance: -50000000,
    percentage: 90
  },
  {
    id: 'BG2023-02',
    accountCode: '4-2000',
    accountName: 'Service Revenue',
    budgetAmount: 150000000,
    actualAmount: 130000000,
    variance: -20000000,
    percentage: 87
  },
  {
    id: 'BG2023-03',
    accountCode: '5-1000',
    accountName: 'Cost of Goods Sold',
    budgetAmount: 300000000,
    actualAmount: 250000000,
    variance: 50000000,
    percentage: 83
  },
  {
    id: 'BG2023-04',
    accountCode: '5-2000',
    accountName: 'Salary Expense',
    budgetAmount: 100000000,
    actualAmount: 80000000,
    variance: 20000000,
    percentage: 80
  },
  {
    id: 'BG2023-05',
    accountCode: '5-3000',
    accountName: 'Rent Expense',
    budgetAmount: 40000000,
    actualAmount: 35000000,
    variance: 5000000,
    percentage: 88
  },
  {
    id: 'BG2023-06',
    accountCode: '5-4000',
    accountName: 'Utilities Expense',
    budgetAmount: 20000000,
    actualAmount: 15000000,
    variance: 5000000,
    percentage: 75
  },
  {
    id: 'BG2023-07',
    accountCode: '5-7000',
    accountName: 'Marketing & Advertising',
    budgetAmount: 25000000,
    actualAmount: 20000000,
    variance: 5000000,
    percentage: 80
  }
];

// Data for chart
const chartData = budgetData.map(item => ({
  name: item.accountName,
  budget: item.budgetAmount / 1000000,
  actual: item.actualAmount / 1000000
}));

const BudgetManagement = () => {
  const [period, setPeriod] = useState('2023');
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold mb-1">Budget Management</h3>
            <p className="text-sm text-muted-foreground">Monitor and manage your budget allocations</p>
          </div>
          <div className="flex gap-2">
            <Select defaultValue="2023">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2021">2021</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Filter size={16} />
              Filter
            </Button>
            <Button variant="outline" className="gap-2">
              <Download size={16} />
              Export
            </Button>
            <Button className="gap-2">
              <Plus size={16} />
              New Budget
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="p-4 border">
            <h4 className="font-medium mb-4 flex items-center">
              <BarChart3 className="mr-2 h-5 w-5 text-primary" />
              Budget vs Actual
            </h4>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                  barGap={0}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45} 
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis label={{ value: 'Million IDR', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(value) => [`${value} Juta`, ""]} />
                  <Legend />
                  <Bar dataKey="budget" name="Budget" fill="#8884d8" />
                  <Bar dataKey="actual" name="Actual" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
          
          <Card className="p-4 border">
            <h4 className="font-medium mb-4 flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-primary" />
              Budget Performance Summary
            </h4>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h5 className="text-sm text-muted-foreground">Total Budget</h5>
                  <p className="text-2xl font-semibold">Rp 1.135.000.000</p>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h5 className="text-sm text-muted-foreground">Total Actual</h5>
                  <p className="text-2xl font-semibold">Rp 980.000.000</p>
                </div>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h5 className="text-sm text-muted-foreground">Overall Budget Utilization</h5>
                  <span className="text-sm font-medium">86%</span>
                </div>
                <div className="w-full bg-muted h-2 rounded-full">
                  <div className="bg-primary h-2 rounded-full" style={{ width: "86%" }}></div>
                </div>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h5 className="text-sm text-muted-foreground">Revenue Achievement</h5>
                  <span className="text-sm font-medium">89%</span>
                </div>
                <div className="w-full bg-muted h-2 rounded-full">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "89%" }}></div>
                </div>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h5 className="text-sm text-muted-foreground">Expense Control</h5>
                  <span className="text-sm font-medium">82%</span>
                </div>
                <div className="w-full bg-muted h-2 rounded-full">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: "82%" }}></div>
                </div>
              </div>
            </div>
          </Card>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Budget ID</TableHead>
                <TableHead>Account</TableHead>
                <TableHead className="text-right">Budget</TableHead>
                <TableHead className="text-right">Actual</TableHead>
                <TableHead className="text-right">Variance</TableHead>
                <TableHead className="text-right">Achievement</TableHead>
                <TableHead className="w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {budgetData.map((item) => (
                <TableRow key={item.id} className="cursor-pointer hover:bg-muted/80">
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{item.accountName}</div>
                      <div className="text-xs text-muted-foreground">{item.accountCode}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{formatCurrency(item.budgetAmount)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(item.actualAmount)}</TableCell>
                  <TableCell 
                    className={`text-right ${item.variance > 0 ? 'text-green-600' : 'text-red-600'}`}
                  >
                    {item.variance > 0 ? '+' : ''}{formatCurrency(item.variance)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <span>{item.percentage}%</span>
                      <div className="w-16 bg-muted h-2 rounded-full">
                        <div 
                          className={`h-2 rounded-full ${
                            item.percentage >= 90 ? 'bg-green-500' : 
                            item.percentage >= 70 ? 'bg-amber-500' : 'bg-red-500'
                          }`} 
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" title="Edit Budget">
                      <Edit className="h-4 w-4" />
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

export default BudgetManagement;
