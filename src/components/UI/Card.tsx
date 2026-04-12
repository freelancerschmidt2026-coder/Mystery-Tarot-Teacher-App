import React from 'react';

export default function Card({ children, className = '' }: any) {
  return (
    <div className={`bg-[#0d0d14] border border-white/5 rounded-3xl p-8 ${className}`}>
      {children}
    </div>
  );
}
