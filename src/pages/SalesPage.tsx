import React, { useState } from 'react';
import PageTransition from '@/components/layout/PageTransition';
import GlassPanel from '@/components/ui/forms/GlassPanel';
import { motion } from 'framer-motion';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Store, 
  Tag, 
  Truck, 
  CreditCard, 
  RotateCcw, 
  Search, 
  Filter, 
  Plus,
  ArrowUpDown,
  Users,
  ArrowRight,
  BarChart
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const salesTransactions = [
  { 
    id: 'SO-2023-001', 
    date: '2023-07-12', 
    customer: 'PT Maju Jaya', 
    amount: 'Rp 5,200,000', 
    status: 'Completed',
    items: 15
  },
  { 
    id: 'SO-2023-002', 
    date: '2023-07-15', 
    customer: 'CV Abadi Sentosa', 
    amount: 'Rp 2,850,000', 
    status: 'Completed',
    items: 8
  },
  { 
    id: 'SO-2023-003', 
    date: '2023-07-22', 
    customer: 'PT Teknologi Maju', 
    amount: 'Rp 3,780,000', 
    status: 'Processing',
    items: 12
  },
  { 
    id: 'SO-2023-004', 
    date: '2023-07-28', 
    customer: 'PT Maju Jaya', 
    amount: 'Rp 1,450,000', 
    status: 'Pending',
    items: 5
  },
  { 
    id: 'SO-2023-005', 
    date: '2023-08-05', 
    customer: 'PT Global Solution', 
    amount: 'Rp 6,750,000', 
    status: 'Completed',
    items: 20
  },
];

const salesData = [
  { name: 'Jan', value: 4200 },
  { name: 'Feb', value: 3800 },
  { name: 'Mar', value: 5100 },
  { name: 'Apr', value: 4800 },
  { name: 'May', value: 6300 },
  { name: 'Jun', value: 5800 },
  { name: 'Jul', value: 6500 },
];

const SalesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'Processing':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold tracking-tight">Sales Module</h1>
            <p className="text-muted-foreground mt-1">
              Manage sales orders, invoices, and customer transactions
            </p>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <GlassPanel className="p-6 col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium">Sales Performance</h3>
              <Button variant="ghost" size="sm" className="text-xs">
                View Details <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={salesData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                  <XAxis 
                    dataKey="name" 
                    stroke="rgba(0,0,0,0.5)"
                    tick={{ fill: 'rgba(0,0,0,0.5)' }}
                  />
                  <YAxis 
                    stroke="rgba(0,0,0,0.5)"
                    tick={{ fill: 'rgba(0,0,0,0.5)' }}
                  />
                  <Tooltip contentStyle={{ backdropFilter: 'blur(8px)', backgroundColor: 'rgba(255,255,255,0.8)' }} />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    dot={{ stroke: '#10b981', strokeWidth: 2, r: 4, fill: 'white' }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </GlassPanel>
          
          <div className="space-y-6">
            <GlassPanel className="p-6">
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-lg bg-primary/10 mr-4">
                  <Store className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Total Sales (Month)
                  </h3>
                  <div className="text-2xl font-semibold">
                    Rp 45,200,000
                  </div>
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">vs Last Month</span>
                <span className="text-green-600">+12.8%</span>
              </div>
            </GlassPanel>
            
            <GlassPanel className="p-6">
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-lg bg-primary/10 mr-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Total Customers
                  </h3>
                  <div className="text-2xl font-semibold">
                    78
                  </div>
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">New This Month</span>
                <span className="text-green-600">+5</span>
              </div>
            </GlassPanel>
            
            <GlassPanel className="p-6">
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-lg bg-primary/10 mr-4">
                  <BarChart className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Average Order Value
                  </h3>
                  <div className="text-2xl font-semibold">
                    Rp 3,850,000
                  </div>
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">vs Last Month</span>
                <span className="text-green-600">+3.2%</span>
              </div>
            </GlassPanel>
          </div>
        </div>
        
        <Tabs defaultValue="transactions" className="mb-8">
          <TabsList className="bg-white/50 dark:bg-background/50 w-full justify-start mb-6 overflow-x-auto flex-nowrap">
            <TabsTrigger value="transactions" className="flex items-center">
              <FileText className="mr-2 h-4 w-4" />
              Transactions
            </TabsTrigger>
            <TabsTrigger value="quotation" className="flex items-center">
              <Tag className="mr-2 h-4 w-4" />
              Quotation
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center">
              <Store className="mr-2 h-4 w-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="delivery" className="flex items-center">
              <Truck className="mr-2 h-4 w-4" />
              Delivery
            </TabsTrigger>
            <TabsTrigger value="invoice" className="flex items-center">
              <FileText className="mr-2 h-4 w-4" />
              Invoice
            </TabsTrigger>
            <TabsTrigger value="receipt" className="flex items-center">
              <CreditCard className="mr-2 h-4 w-4" />
              Receipt
            </TabsTrigger>
            <TabsTrigger value="return" className="flex items-center">
              <RotateCcw className="mr-2 h-4 w-4" />
              Return
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="transactions" className="mt-0">
            <GlassPanel className="p-6">
              <div className="flex justify-between flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 flex items-center space-x-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search transactions..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" className="whitespace-nowrap">
                    Export Data
                  </Button>
                  <Button className="whitespace-nowrap">
                    <Plus className="mr-2 h-4 w-4" />
                    New Transaction
                  </Button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <span>Transaction ID</span>
                          <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <span>Date</span>
                          <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <span>Customer</span>
                          <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <span>Items</span>
                          <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </th>
                      <th className="text-right py-3 px-4 font-medium text-muted-foreground">
                        <div className="flex items-center justify-end space-x-1">
                          <span>Amount</span>
                          <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </th>
                      <th className="text-center py-3 px-4 font-medium text-muted-foreground">Status</th>
                      <th className="text-right py-3 px-4 font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salesTransactions.map((transaction, index) => (
                      <motion.tr 
                        key={transaction.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="border-b border-border/50 hover:bg-secondary/30 transition-colors"
                      >
                        <td className="py-3 px-4">
                          <div className="font-medium">{transaction.id}</div>
                        </td>
                        <td className="py-3 px-4">
                          <div>{transaction.date}</div>
                        </td>
                        <td className="py-3 px-4">
                          <div>{transaction.customer}</div>
                        </td>
                        <td className="py-3 px-4">
                          <div>{transaction.items}</div>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="font-medium">{transaction.amount}</div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex justify-center">
                            <Badge variant="secondary" className={`${getStatusColor(transaction.status)}`}>
                              {transaction.status}
                            </Badge>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Button variant="ghost" size="sm">View</Button>
                          <Button variant="ghost" size="sm">Edit</Button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="flex items-center justify-between mt-6">
                <div className="text-sm text-muted-foreground">
                  Showing 5 of 32 transactions
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" disabled>Previous</Button>
                  <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">1</Button>
                  <Button variant="outline" size="sm">2</Button>
                  <Button variant="outline" size="sm">3</Button>
                  <Button variant="outline" size="sm">Next</Button>
                </div>
              </div>
            </GlassPanel>
          </TabsContent>
          
          <TabsContent value="quotation">
            <GlassPanel className="p-6">
              <div className="text-center py-8">
                <h3 className="text-lg font-medium mb-2">Sales Quotation</h3>
                <p className="text-muted-foreground mb-6">Create price quotes for customers</p>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Quotation
                </Button>
              </div>
            </GlassPanel>
          </TabsContent>
          
          <TabsContent value="orders">
            <GlassPanel className="p-6">
              <div className="text-center py-8">
                <h3 className="text-lg font-medium mb-2">Sales Orders</h3>
                <p className="text-muted-foreground mb-6">Manage customer orders</p>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Sales Order
                </Button>
              </div>
            </GlassPanel>
          </TabsContent>
          
          <TabsContent value="delivery">
            <GlassPanel className="p-6">
              <div className="text-center py-8">
                <h3 className="text-lg font-medium mb-2">Delivery Orders</h3>
                <p className="text-muted-foreground mb-6">Track deliveries to customers</p>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Delivery Order
                </Button>
              </div>
            </GlassPanel>
          </TabsContent>
          
          <TabsContent value="invoice">
            <GlassPanel className="p-6">
              <div className="text-center py-8">
                <h3 className="text-lg font-medium mb-2">Sales Invoices</h3>
                <p className="text-muted-foreground mb-6">Manage invoices for customers</p>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Invoice
                </Button>
              </div>
            </GlassPanel>
          </TabsContent>
          
          <TabsContent value="receipt">
            <GlassPanel className="p-6">
              <div className="text-center py-8">
                <h3 className="text-lg font-medium mb-2">Sales Receipts</h3>
                <p className="text-muted-foreground mb-6">Record payments from customers</p>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Receipt
                </Button>
              </div>
            </GlassPanel>
          </TabsContent>
          
          <TabsContent value="return">
            <GlassPanel className="p-6">
              <div className="text-center py-8">
                <h3 className="text-lg font-medium mb-2">Sales Returns</h3>
                <p className="text-muted-foreground mb-6">Process customer returns</p>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Return
                </Button>
              </div>
            </GlassPanel>
          </TabsContent>
        </Tabs>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Sales Summary</CardTitle>
              <CardDescription>Last 30 days activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Orders:</span>
                  <span className="font-medium">45</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Amount:</span>
                  <span className="font-medium">Rp 58,750,000</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Pending Invoices:</span>
                  <span className="font-medium">Rp 15,420,000</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View Detailed Report</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Top Customers</CardTitle>
              <CardDescription>Based on total purchases</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>PT Maju Jaya</span>
                  <span className="font-medium">Rp 22,800,000</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span>CV Abadi Sentosa</span>
                  <span className="font-medium">Rp 18,350,000</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span>PT Global Solution</span>
                  <span className="font-medium">Rp 15,780,000</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View All Customers</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest sales events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-start">
                    <span className="font-medium">New Order Created</span>
                    <span className="text-xs text-muted-foreground">1h ago</span>
                  </div>
                  <p className="text-sm text-muted-foreground">SO-2023-006 from PT Teknologi Maju</p>
                </div>
                <Separator />
                <div>
                  <div className="flex justify-between items-start">
                    <span className="font-medium">Payment Received</span>
                    <span className="text-xs text-muted-foreground">3h ago</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Rp 5,200,000 from PT Maju Jaya</p>
                </div>
                <Separator />
                <div>
                  <div className="flex justify-between items-start">
                    <span className="font-medium">Delivery Completed</span>
                    <span className="text-xs text-muted-foreground">Yesterday</span>
                  </div>
                  <p className="text-sm text-muted-foreground">8 items to CV Abadi Sentosa</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View All Activities</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
};

export default SalesPage;
