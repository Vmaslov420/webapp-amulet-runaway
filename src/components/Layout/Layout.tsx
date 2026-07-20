// src/components/Layout/Layout.tsx
import React from 'react';
import './layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  // Recuperiamo l'anno corrente dinamicamente per il footer
  const currentYear = new Date().getFullYear();

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo-text">Amulet Scan</div>
      </header>

      <main className="app-main">
        {children}
      </main>

      <footer className="app-footer">
        <p>&copy; {currentYear} Associazione Studentesca No-Profit</p>
      </footer>
    </div>
  );
}