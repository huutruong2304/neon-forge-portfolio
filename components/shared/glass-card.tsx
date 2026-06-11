import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
};

const GlassCard = ({ children, className = '' }: Props) => (
  <div
    className={`bg-white/10 backdrop-blur-md min-h-16 border border-white/20 rounded-3xl transition-all duration-300 hover:border-white/40 ${className}`}
  >
    {children}
  </div>
);

export default GlassCard;
