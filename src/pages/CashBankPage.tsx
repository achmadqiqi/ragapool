import React, { useState } from 'react';
import PageTransition from '@/components/layout/PageTransition';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus, Wallet, Building, ArrowUpDown, Receipt, PieChart, History } from 'lucide-react';
import CashAccounts from '@/components/cash-bank/CashAccounts';
import BankAccounts from '@/components/cash-bank/BankAccounts';
import CashTransactions from '@/components/cash-bank/CashTransactions';
import BankReconciliation from '@/components/cash-bank/BankReconciliation';
import CashFlowReport from '@/components/cash-bank/CashFlowReport';

const CashBankPage = () => {
  const [activeTab, setActiveTab] = useState('cash-accounts');

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
                <h1 className="text-3xl font-bold tracking-tight">Cash & Bank</h1>
                <p className="text-muted-foreground mt-1">
                  Manage your cash accounts, bank accounts, and financial transactions
                </p>
              </div>
              <Button className="gap-2">
                <Plus size={16} />
                New Transaction
              </Button>
            </div>
          </motion.div>
        </div>
        
        <Tabs defaultValue="cash-accounts" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-5 h-auto p-1 w-full max-w-4xl bg-muted/60">
            <TabsTrigger value="cash-accounts" className="flex gap-2 py-2">
              <Wallet size={16} />
              <span className="hidden sm:inline">Cash Accounts</span>
            </TabsTrigger>
            <TabsTrigger value="bank-accounts" className="flex gap-2 py-2">
              <Building size={16} />
              <span className="hidden sm:inline">Bank Accounts</span>
            </TabsTrigger>
            <TabsTrigger value="transactions" className="flex gap-2 py-2">
              <ArrowUpDown size={16} />
              <span className="hidden sm:inline">Transactions</span>
            </TabsTrigger>
            <TabsTrigger value="reconciliation" className="flex gap-2 py-2">
              <Receipt size={16} />
              <span className="hidden sm:inline">Reconciliation</span>
            </TabsTrigger>
            <TabsTrigger value="cash-flow" className="flex gap-2 py-2">
              <PieChart size={16} />
              <span className="hidden sm:inline">Cash Flow</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="cash-accounts" className="space-y-4">
            <CashAccounts />
          </TabsContent>
          
          <TabsContent value="bank-accounts" className="space-y-4">
            <BankAccounts />
          </TabsContent>
          
          <TabsContent value="transactions" className="space-y-4">
            <CashTransactions />
          </TabsContent>
          
          <TabsContent value="reconciliation" className="space-y-4">
            <BankReconciliation />
          </TabsContent>
          
          <TabsContent value="cash-flow" className="space-y-4">
            <CashFlowReport />
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default CashBankPage;
