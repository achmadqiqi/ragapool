import React, { useState } from 'react';
import PageTransition from '@/components/layout/PageTransition';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpenText, Plus, FileText, PieChart, BarChart3, Calculator, History } from 'lucide-react';
import GeneralJournal from '@/components/general-ledger/GeneralJournal';
import LedgerAccounts from '@/components/general-ledger/LedgerAccounts';
import ChartOfAccounts from '@/components/general-ledger/ChartOfAccounts';
import FinancialReports from '@/components/general-ledger/FinancialReports';
import BudgetManagement from '@/components/general-ledger/BudgetManagement';

const GeneralLedgerPage = () => {
  const [activeTab, setActiveTab] = useState('journal');

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">General Ledger</h1>
                <p className="text-muted-foreground mt-1">
                  Manage your accounting entries and financial records
                </p>
              </div>
              <Button className="gap-2">
                <Plus size={16} />
                New Journal Entry
              </Button>
            </div>
          </motion.div>
        </div>
        
        <Tabs defaultValue="journal" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-5 h-auto p-1 w-full max-w-4xl bg-muted/60">
            <TabsTrigger value="journal" className="flex gap-2 py-2">
              <BookOpenText size={16} />
              <span className="hidden sm:inline">General Journal</span>
            </TabsTrigger>
            <TabsTrigger value="ledger" className="flex gap-2 py-2">
              <History size={16} />
              <span className="hidden sm:inline">Ledger History</span>
            </TabsTrigger>
            <TabsTrigger value="chart" className="flex gap-2 py-2">
              <Calculator size={16} />
              <span className="hidden sm:inline">Chart of Accounts</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex gap-2 py-2">
              <FileText size={16} />
              <span className="hidden sm:inline">Financial Reports</span>
            </TabsTrigger>
            <TabsTrigger value="budget" className="flex gap-2 py-2">
              <BarChart3 size={16} />
              <span className="hidden sm:inline">Budget Management</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="journal" className="space-y-4">
            <GeneralJournal />
          </TabsContent>
          
          <TabsContent value="ledger" className="space-y-4">
            <LedgerAccounts />
          </TabsContent>
          
          <TabsContent value="chart" className="space-y-4">
            <ChartOfAccounts />
          </TabsContent>
          
          <TabsContent value="reports" className="space-y-4">
            <FinancialReports />
          </TabsContent>
          
          <TabsContent value="budget" className="space-y-4">
            <BudgetManagement />
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default GeneralLedgerPage;
