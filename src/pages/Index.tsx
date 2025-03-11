import React, {useEffect, useState} from 'react';
    import { motion } from 'framer-motion';
    import PageTransition from '@/components/layout/PageTransition';
    import GlassPanel from '@/components/ui/forms/GlassPanel';
    import DashboardCard from '@/components/ui/dashboard/DashboardCard';
    import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
    import {
      ShoppingCart,
      Store,
      PackageOpen,
      BookOpen,
      Landmark,
      Building,
      TrendingUp,
      BarChart3,
      DollarSign,
      Users,
      ArrowUpRight,
      ArrowDownRight,
      ArrowRight
    } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { Card } from '@/components/ui/card';
    import {
      LineChart,
      Line,
      AreaChart,
      Area,
      XAxis,
      YAxis,
      CartesianGrid,
      Tooltip,
      Legend,
      ResponsiveContainer,
      BarChart,
      Bar
    } from 'recharts';
    import {FixedAssetsManager} from "@/modules/FixedAssets";

    const salesData = [
      { name: 'Jan', value: 1000 },
      { name: 'Feb', value: 1200 },
      { name: 'Mar', value: 900 },
      { name: 'Apr', value: 1500 },
      { name: 'May', value: 1700 },
      { name: 'Jun', value: 1400 },
      { name: 'Jul', value: 1800 },
    ];

    const purchaseData = [
      { name: 'Jan', value: 800 },
      { name: 'Feb', value: 950 },
      { name: 'Mar', value: 700 },
      { name: 'Apr', value: 1200 },
      { name: 'May', value: 1300 },
      { name: 'Jun', value: 1100 },
      { name: 'Jul', value: 1400 },
    ];

    const revenueData = [
      { name: 'Jan', income: 1000, expenses: 800, profit: 200 },
      { name: 'Feb', income: 1200, expenses: 950, profit: 250 },
      { name: 'Mar', income: 900, expenses: 700, profit: 200 },
      { name: 'Apr', income: 1500, expenses: 1200, profit: 300 },
      { name: 'May', income: 1700, expenses: 1300, profit: 400 },
      { name: 'Jun', income: 1400, expenses: 1100, profit: 300 },
      { name: 'Jul', income: 1800, expenses: 1400, profit: 400 },
    ];

    const topProductsData = [
      { name: 'Product A', sales: 80 },
      { name: 'Product B', sales: 65 },
      { name: 'Product C', sales: 50 },
      { name: 'Product D', sales: 45 },
      { name: 'Product E', sales: 35 },
    ];

    const Index = () => {
      const [fixedAssetsSummary, setFixedAssetsSummary] = useState({
        totalAcquisitionCost: 0,
        totalAccumulatedDepreciation: 0,
        netBookValue: 0,
      });

      useEffect(() => {
        const fixedAssetsManager = new FixedAssetsManager();
        // In a real app, you'd fetch this data from an API.
        // Here, we're just using the manager to calculate based on its internal state.
        const totalAcquisitionCost = fixedAssetsManager.getTotalAcquisitionCost();
        const totalAccumulatedDepreciation = fixedAssetsManager.getTotalAccumulatedDepreciation();
        const netBookValue = fixedAssetsManager.getNetBookValue();

        setFixedAssetsSummary({
          totalAcquisitionCost,
          totalAccumulatedDepreciation,
          netBookValue,
        });
      }, []);

      const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
          minimumFractionDigits: 0,
        }).format(amount);
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
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground mt-1">
                  Welcome to your Laporan Keuangan dashboard
                </p>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <DashboardCard
                title="Total Sales"
                value="Rp 8.500.000"
                icon={<Store className="h-5 w-5 text-primary" />}
                trend={{ value: 12.5, isPositive: true }}
                delay={0}
              />

              <DashboardCard
                title="Total Purchase"
                value="Rp 6.450.000"
                icon={<ShoppingCart className="h-5 w-5 text-primary" />}
                trend={{ value: 8.3, isPositive: true }}
                delay={1}
              />

              <DashboardCard
                title="Inventory Value"
                value="Rp 12.750.000"
                icon={<PackageOpen className="h-5 w-5 text-primary" />}
                trend={{ value: 3.2, isPositive: true }}
                delay={2}
              />

              <DashboardCard
                title="Cash Balance"
                value="Rp 15.230.000"
                icon={<Landmark className="h-5 w-5 text-primary" />}
                trend={{ value: 5.7, isPositive: false }}
                delay={3}
              />

              <DashboardCard
                title="Total Acquisition Cost"
                value={formatCurrency(fixedAssetsSummary.totalAcquisitionCost)}
                icon={<Building className="h-5 w-5 text-primary" />}
                delay={4}
              />

              <DashboardCard
                title="Total Accumulated Depreciation"
                value={formatCurrency(fixedAssetsSummary.totalAccumulatedDepreciation)}
                icon={<Building className="h-5 w-5 text-primary" />}
                delay={5}
              />

              <DashboardCard
                title="Net Book Value"
                value={formatCurrency(fixedAssetsSummary.netBookValue)}
                icon={<Building className="h-5 w-5 text-primary" />}
                delay={6}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <GlassPanel className="lg:col-span-2 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium">Revenue Overview</h3>
                  <Tabs defaultValue="monthly">
                    <TabsList className="bg-white/50 dark:bg-background/50">
                      <TabsTrigger value="weekly">Weekly</TabsTrigger>
                      <TabsTrigger value="monthly">Monthly</TabsTrigger>
                      <TabsTrigger value="yearly">Yearly</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={revenueData}
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
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="income"
                        stroke="#3b82f6"
                        fill="rgba(59, 130, 246, 0.2)"
                        activeDot={{ r: 8 }}
                      />
                      <Area
                        type="monotone"
                        dataKey="expenses"
                        stroke="#ef4444"
                        fill="rgba(239, 68, 68, 0.2)"
                      />
                      <Area
                        type="monotone"
                        dataKey="profit"
                        stroke="#10b981"
                        fill="rgba(16, 185, 129, 0.2)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </GlassPanel>

              <GlassPanel className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium">Top Products</h3>
                  <Button variant="ghost" size="sm" className="text-xs">
                    View All <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>

                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      layout="vertical"
                      data={topProductsData}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 20,
                        bottom: 10,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                      <XAxis type="number" stroke="rgba(0,0,0,0.5)" />
                      <YAxis
                        dataKey="name"
                        type="category"
                        scale="band"
                        stroke="rgba(0,0,0,0.5)"
                        tick={{ fill: 'rgba(0,0,0,0.5)' }}
                      />
                      <Tooltip contentStyle={{ backdropFilter: 'blur(8px)', backgroundColor: 'rgba(255,255,255,0.8)' }} />
                      <Bar dataKey="sales" fill="rgba(59, 130, 246, 0.8)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </GlassPanel>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
              <GlassPanel className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium">Sales Trend</h3>
                  <Button variant="ghost" size="sm" className="text-xs">
                    View Details <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>

                <div className="h-60">
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
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={{ stroke: '#3b82f6', strokeWidth: 2, r: 4, fill: 'white' }}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </GlassPanel>

              <GlassPanel className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium">Purchase Trend</h3>
                  <Button variant="ghost" size="sm" className="text-xs">
                    View Details <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>

                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={purchaseData}
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
                        stroke="#ef4444"
                        strokeWidth={2}
                        dot={{ stroke: '#ef4444', strokeWidth: 2, r: 4, fill: 'white' }}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </GlassPanel>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="p-6 border border-border/50 shadow-sm">
                <h3 className="text-lg font-medium flex items-center mb-4">
                  <BookOpen className="mr-2 h-5 w-5 text-primary" />
                  General Ledger
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Manage your accounting entries and financial records
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-auto"
                  onClick={() => window.location.href = '/general-ledger'}
                >
                  Open Module
                </Button>
              </Card>

              <Card className="p-6 border border-border/50 shadow-sm">
                <h3 className="text-lg font-medium flex items-center mb-4">
                  <Store className="mr-2 h-5 w-5 text-primary" />
                  Sales
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Manage sales orders, invoices, and customer transactions
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-auto"
                  onClick={() => window.location.href = '/sales'}
                >
                  Open Module
                </Button>
              </Card>

              <Card className="p-6 border border-border/50 shadow-sm">
                <h3 className="text-lg font-medium flex items-center mb-4">
                  <ShoppingCart className="mr-2 h-5 w-5 text-primary" />
                  Purchase
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Track purchases, manage suppliers and purchase orders
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-auto"
                  onClick={() => window.location.href = '/purchase'}
                >
                  Open Module
                </Button>
              </Card>

              <Card className="p-6 border border-border/50 shadow-sm">
                <h3 className="text-lg font-medium flex items-center mb-4">
                  <PackageOpen className="mr-2 h-5 w-5 text-primary" />
                  Inventory
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Manage your stock, products and inventory adjustments
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-auto"
                  onClick={() => window.location.href = '/inventory'}
                >
                  Open Module
                </Button>
              </Card>
            </div>
          </div>
        </PageTransition>
      );
    };

    export default Index;
