import React, { useState } from 'react';
import PageTransition from '@/components/layout/PageTransition';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Package, 
  Warehouse, 
  BarChart3, 
  FileText, 
  ArrowLeftRight,
  Settings,
  Search,
  Plus
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import InventoryList from '@/components/inventory/InventoryList';
import WarehouseManagement from '@/components/inventory/WarehouseManagement';
import InventoryAdjustment from '@/components/inventory/InventoryAdjustment';
import InventoryTransfer from '@/components/inventory/InventoryTransfer';

const InventoryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto">
        <div className="mb-5">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold tracking-tight">Inventory Module</h1>
            <p className="text-muted-foreground mt-1">
              Manage your inventory items, stock levels, and adjustments
            </p>
          </motion.div>
        </div>
        
        <div className="flex flex-col gap-5">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search inventory..."
                className="pl-8 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button>
              <Plus className="mr-1 h-4 w-4" /> Add New Item
            </Button>
          </div>
          
          <Tabs defaultValue="items" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 mb-4">
              <TabsTrigger value="items" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                <span className="hidden sm:inline">Items & Services</span>
                <span className="sm:hidden">Items</span>
              </TabsTrigger>
              <TabsTrigger value="warehouses" className="flex items-center gap-2">
                <Warehouse className="h-4 w-4" />
                <span className="hidden sm:inline">Warehouses</span>
                <span className="sm:hidden">Warehouse</span>
              </TabsTrigger>
              <TabsTrigger value="adjustment" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">Adjustments</span>
                <span className="sm:hidden">Adjust</span>
              </TabsTrigger>
              <TabsTrigger value="transfer" className="flex items-center gap-2">
                <ArrowLeftRight className="h-4 w-4" />
                <span className="hidden sm:inline">Transfers</span>
                <span className="sm:hidden">Transfer</span>
              </TabsTrigger>
              <TabsTrigger value="reports" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">Reports</span>
                <span className="sm:hidden">Reports</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="items" className="mt-0">
              <InventoryList searchTerm={searchTerm} />
            </TabsContent>
            
            <TabsContent value="warehouses" className="mt-0">
              <WarehouseManagement />
            </TabsContent>
            
            <TabsContent value="adjustment" className="mt-0">
              <InventoryAdjustment />
            </TabsContent>
            
            <TabsContent value="transfer" className="mt-0">
              <InventoryTransfer />
            </TabsContent>
            
            <TabsContent value="reports" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Inventory Reports</CardTitle>
                  <CardDescription>
                    View and generate reports for your inventory
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center text-center">
                      <BarChart3 className="h-8 w-8 mb-2" />
                      <span className="font-medium">Stock Level Report</span>
                      <span className="text-xs text-muted-foreground mt-1">Current stock levels across all warehouses</span>
                    </Button>
                    
                    <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center text-center">
                      <FileText className="h-8 w-8 mb-2" />
                      <span className="font-medium">Valuation Report</span>
                      <span className="text-xs text-muted-foreground mt-1">Inventory value based on cost and market price</span>
                    </Button>
                    
                    <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center text-center">
                      <ArrowLeftRight className="h-8 w-8 mb-2" />
                      <span className="font-medium">Movement Report</span>
                      <span className="text-xs text-muted-foreground mt-1">Track item movements between warehouses</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageTransition>
  );
};

export default InventoryPage;
