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
  ShoppingCart, 
  Clipboard, 
  Truck, 
  CreditCard, 
  RotateCcw, 
  Search, 
  Filter, 
  Plus,
  ArrowUpDown
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

const purchaseTransactions = [
  { 
    id: 'PO-2023-001', 
    date: '2023-07-15', 
    supplier: 'PT Supplier Utama', 
    amount: 'Rp 3,500,000', 
    status: 'Complete',
    items: 12
  },
  { 
    id: 'PO-2023-002', 
    date: '2023-07-18', 
    supplier: 'CV Mitra Sejati', 
    amount: 'Rp 1,250,000', 
    status: 'Complete',
    items: 8
  },
  { 
    id: 'PO-2023-003', 
    date: '2023-07-25', 
    supplier: 'PT Distributor Jaya', 
    amount: 'Rp 2,780,000', 
    status: 'Pending',
    items: 15
  },
  { 
    id: 'PO-2023-004', 
    date: '2023-08-02', 
    supplier: 'PT Supplier Utama', 
    amount: 'Rp 950,000', 
    status: 'Processing',
    items: 5
  },
  { 
    id: 'PO-2023-005', 
    date: '2023-08-10', 
    supplier: 'CV Abadi Jaya', 
    amount: 'Rp 4,200,000', 
    status: 'Complete',
    items: 18
  },
];

const PurchasePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Complete':
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
            <h1 className="text-3xl font-bold tracking-tight">Purchase Module</h1>
            <p className="text-muted-foreground mt-1">
              Manage purchase orders, invoices, and supplier transactions
            </p>
          </motion.div>
        </div>
        
        <Tabs defaultValue="transactions" className="mb-8">
          <TabsList className="bg-white/50 dark:bg-background/50 w-full justify-start mb-6 overflow-x-auto flex-nowrap">
            <TabsTrigger value="transactions" className="flex items-center">
              <FileText className="mr-2 h-4 w-4" />
              Transactions
            </TabsTrigger>
            <TabsTrigger value="requisition" className="flex items-center">
              <Clipboard className="mr-2 h-4 w-4" />
              Requisition
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="receive" className="flex items-center">
              <Truck className="mr-2 h-4 w-4" />
              Receive
            </TabsTrigger>
            <TabsTrigger value="invoice" className="flex items-center">
              <FileText className="mr-2 h-4 w-4" />
              Invoice
            </TabsTrigger>
            <TabsTrigger value="payment" className="flex items-center">
              <CreditCard className="mr-2 h-4 w-4" />
              Payment
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
                          <span>Supplier</span>
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
                    {purchaseTransactions.map((transaction, index) => (
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
                          <div>{transaction.supplier}</div>
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
                  Showing 5 of 24 transactions
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
          
          <TabsContent value="requisition">
            <GlassPanel className="p-6">
              <div className="text-center py-8">
                <h3 className="text-lg font-medium mb-2">Purchase Requisition</h3>
                <p className="text-muted-foreground mb-6">Create and manage purchase requisitions</p>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Requisition
                </Button>
              </div>
            </GlassPanel>
          </TabsContent>
          
          <TabsContent value="orders">
            <GlassPanel className="p-6">
              <div className="text-center py-8">
                <h3 className="text-lg font-medium mb-2">Purchase Orders</h3>
                <p className="text-muted-foreground mb-6">Manage orders sent to suppliers</p>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Purchase Order
                </Button>
              </div>
            </GlassPanel>
          </TabsContent>
          
          <TabsContent value="receive">
            <GlassPanel className="p-6">
              <div className="text-center py-8">
                <h3 className="text-lg font-medium mb-2">Receive Items</h3>
                <p className="text-muted-foreground mb-6">Record items received from suppliers</p>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Record Item Receipt
                </Button>
              </div>
            </GlassPanel>
          </TabsContent>
          
          <TabsContent value="invoice">
            <GlassPanel className="p-6">
              <div className="text-center py-8">
                <h3 className="text-lg font-medium mb-2">Purchase Invoices</h3>
                <p className="text-muted-foreground mb-6">Manage invoices from suppliers</p>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Invoice
                </Button>
              </div>
            </GlassPanel>
          </TabsContent>
          
          <TabsContent value="payment">
            <GlassPanel className="p-6">
              <div className="text-center py-8">
                <h3 className="text-lg font-medium mb-2">Purchase Payments</h3>
                <p className="text-muted-foreground mb-6">Record payments to suppliers</p>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Payment
                </Button>
              </div>
            </GlassPanel>
          </TabsContent>
          
          <TabsContent value="return">
            <GlassPanel className="p-6">
              <div className="text-center py-8">
                <h3 className="text-lg font-medium mb-2">Purchase Returns</h3>
                <p className="text-muted-foreground mb-6">Manage returns to suppliers</p>
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
              <CardTitle>Purchase Summary</CardTitle>
              <CardDescription>Last 30 days activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Orders:</span>
                  <span className="font-medium">32</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Amount:</span>
                  <span className="font-medium">Rp 45,250,000</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Pending Payments:</span>
                  <span className="font-medium">Rp 12,780,000</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View Detailed Report</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Top Suppliers</CardTitle>
              <CardDescription>Based on total purchases</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>PT Supplier Utama</span>
                  <span className="font-medium">Rp 18,500,000</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span>CV Mitra Sejati</span>
                  <span className="font-medium">Rp 12,250,000</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span>PT Distributor Jaya</span>
                  <span className="font-medium">Rp 9,780,000</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View All Suppliers</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest purchase events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-start">
                    <span className="font-medium">New Order Created</span>
                    <span className="text-xs text-muted-foreground">2h ago</span>
                  </div>
                  <p className="text-sm text-muted-foreground">PO-2023-006 for CV Abadi Jaya</p>
                </div>
                <Separator />
                <div>
                  <div className="flex justify-between items-start">
                    <span className="font-medium">Payment Recorded</span>
                    <span className="text-xs text-muted-foreground">5h ago</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Rp 3,500,000 to PT Supplier Utama</p>
                </div>
                <Separator />
                <div>
                  <div className="flex justify-between items-start">
                    <span className="font-medium">Items Received</span>
                    <span className="text-xs text-muted-foreground">Yesterday</span>
                  </div>
                  <p className="text-sm text-muted-foreground">12 items from PO-2023-004</p>
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

export default PurchasePage;
