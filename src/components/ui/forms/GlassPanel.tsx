import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

const GlassPanel: React.FC<GlassPanelProps> = ({ 
  children, 
  className, 
  onClick,
  hover = true
}) => {
  return (
    <div 
      className={cn(
        'bg-white/30 backdrop-blur-xl border border-white/40 rounded-2xl shadow-glass',
        hover && 'hover:shadow-glass-hover transition-all duration-300 ease-in-out',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default GlassPanel;
