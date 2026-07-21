// src/components/Layout/Layout.tsx
import React from 'react';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  // Recuperiamo l'anno corrente dinamicamente per il footer
  const currentYear = new Date().getFullYear();

  return (
    <div className="app-container">


      <main className="app-main">
        {children}
      </main>

      <footer className="app-footer">
        <p> SUPERSTIZIONI ELETTRONICHE VOL.3 •  {currentYear} </p>
      </footer>
    </div>
  );
}