import { useState, useEffect } from "react";
    import { Toaster } from "@/components/ui/toaster";
    import { Toaster as Sonner } from "@/components/ui/sonner";
    import { TooltipProvider } from "@/components/ui/tooltip";
    import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
    import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
    import { AnimatePresence } from "framer-motion";
    import Index from "./pages/Index";
    import PurchasePage from "./pages/PurchasePage";
    import SalesPage from "./pages/SalesPage";
    import InventoryPage from "./pages/InventoryPage";
    import GeneralLedgerPage from "./pages/GeneralLedgerPage";
    import CashBankPage from "./pages/CashBankPage";
    import FixedAssetsPage from "./pages/FixedAssetsPage";
    import SettingsPage from "./pages/Settings";
    import NotFound from "./pages/NotFound";
    import Navbar from "./components/layout/Navbar";
    import Sidebar from "./components/layout/Sidebar";

    const queryClient = new QueryClient();

    const AnimatedRoutes = () => {
      const location = useLocation();

      return (
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Index />} />
            <Route path="/purchase" element={<PurchasePage />} />
            <Route path="/sales" element={<SalesPage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/general-ledger" element={<GeneralLedgerPage />} />
            <Route path="/cash-bank" element={<CashBankPage />} />
            <Route path="/fixed-assets" element={<FixedAssetsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      );
    };

    const AppContent = () => {
      const [sidebarOpen, setSidebarOpen] = useState(true);
      const location = useLocation();

      // On mobile devices, close sidebar when navigating to a new page
      useEffect(() => {
        const handleResize = () => {
          if (window.innerWidth < 768) {
            setSidebarOpen(false);
          } else {
            setSidebarOpen(true);
          }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

      // Close sidebar on navigation on mobile
      useEffect(() => {
        if (window.innerWidth < 768) {
          setSidebarOpen(false);
        }
      }, [location.pathname]);

      return (
        <div className="flex min-h-screen">
          <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
          <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-[76px]'}`}>
            <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
            <main className="pt-20 px-4 md:px-6 lg:px-8 min-h-screen">
              <AnimatedRoutes />
            </main>
          </div>
        </div>
      );
    };

    const App = () => (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    );

    export default App;
