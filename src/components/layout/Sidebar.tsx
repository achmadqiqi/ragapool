import React from 'react';
    import { NavLink } from 'react-router-dom';
    import {
      LayoutGrid,
      ShoppingCart,
      Store,
      PackageOpen,
      BookOpen,
      Landmark,
      Building,
      Settings,
      ChevronRight
    } from 'lucide-react';

    interface SidebarProps {
      isOpen: boolean;
      setIsOpen: (isOpen: boolean) => void;
    }

    interface NavItemProps {
      to: string;
      icon: React.ReactNode;
      label: string;
      isOpen: boolean;
    }

    const NavItem: React.FC<NavItemProps> = ({ to, icon, label, isOpen }) => {
      return (
        <NavLink
          to={to}
          className={({ isActive }) => `
            group flex items-center py-3 px-4 rounded-lg mb-1 transition-all duration-300
            ${isActive
              ? 'bg-primary text-primary-foreground font-medium'
              : 'hover:bg-secondary text-foreground/80 hover:text-foreground'}
            ${isOpen ? 'justify-start' : 'justify-center'}
          `}
        >
          <div className="flex items-center">
            <span className={`${isOpen ? 'mr-3' : ''}`}>
              {icon}
            </span>
            <span className={`transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>
              {label}
            </span>
          </div>

          <div className={`absolute right-4 transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>
            <ChevronRight className="h-4 w-4" />
          </div>
        </NavLink>
      );
    };

    const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
      const navItems = [
        { to: '/', icon: <LayoutGrid className="h-5 w-5" />, label: 'Dashboard' },
        { to: '/purchase', icon: <ShoppingCart className="h-5 w-5" />, label: 'Purchase' },
        { to: '/sales', icon: <Store className="h-5 w-5" />, label: 'Sales' },
        { to: '/inventory', icon: <PackageOpen className="h-5 w-5" />, label: 'Inventory' },
        { to: '/general-ledger', icon: <BookOpen className="h-5 w-5" />, label: 'General Ledger' },
        { to: '/cash-bank', icon: <Landmark className="h-5 w-5" />, label: 'Cash & Bank' },
        { to: '/fixed-assets', icon: <Building className="h-5 w-5" />, label: 'Fixed Assets' }, // Added Fixed Assets
        { to: '/settings', icon: <Settings className="h-5 w-5" />, label: 'Settings' },
      ];

      return (
        <aside
          className={`fixed left-0 top-0 bottom-0 z-40 pt-20 bg-white/90 dark:bg-background/90 backdrop-blur-lg shadow-lg transition-all duration-300 ease-in-out overflow-hidden
            ${isOpen ? 'w-64' : 'w-[76px]'}
          `}
        >
          <div className="h-full px-3 py-3 flex flex-col justify-between">
            <div className="space-y-1">
              {navItems.map((item, index) => (
                <NavItem
                  key={index}
                  to={item.to}
                  icon={item.icon}
                  label={item.label}
                  isOpen={isOpen}
                />
              ))}
            </div>

            <div className={`flex justify-center mt-auto pt-6 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
              <div className="glass-card p-4 w-full text-center">
                <div className="text-xs text-muted-foreground">
                  Laporan Keuangan v1.0.0
                </div>
              </div>
            </div>
          </div>
        </aside>
      );
    };

    export default Sidebar;
