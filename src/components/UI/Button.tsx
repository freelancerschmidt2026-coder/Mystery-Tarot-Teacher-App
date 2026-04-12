import React from 'react';

export default function Button({ children, onClick, variant = 'primary', className = '' }: any) {
  const base = "px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ";
  const variants: any = {
    primary: "bg-white text-black hover:bg-purple-400",
    secondary: "bg-purple-500/10 text-purple-400 border border-purple-500/20 hover:bg-purple-500/20",
    ghost: "text-slate-400 hover:text-white hover:bg-white/5",
  };

  return (
    <button onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}
