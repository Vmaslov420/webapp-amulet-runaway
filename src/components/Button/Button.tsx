// src/components/Button/Button.tsx
import React from 'react';
import './Button.css';

// Estendiamo gli attributi nativi del bottone per non doverli riscrivere tutti
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'cyan' | 'purple'; // Accettiamo solo questi due valori esatti
}

export function Button({ children, variant = 'cyan', ...props }: ButtonProps) {
  const variantClass = variant === 'purple' ? 'variant-purple' : '';

  return (
    <button 
      className={`glow-button ${variantClass}`} 
      {...props}
    >
      {children}
    </button>
  );
}