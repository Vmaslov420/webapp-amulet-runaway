// src/components/Scanner/Scanner.tsx
import { useEffect } from 'react';
import './scanner.css';

interface ScannerProps {
  image: string; 
  onComplete: () => void; 
}

export function Scanner({ image, onComplete }: ScannerProps) {
  
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <>
      {/* Sfondo pulsante a tutto schermo che appare SOLO in questa fase */}
      <div className="scanner-page-bg"></div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <h2 style={{ color: 'var(--neon-purple)', marginBottom: '1.5rem', textAlign: 'center', letterSpacing: '2px' }}>
          Lettura in corso...
        </h2>
        
        <div className="scanner-container">
          <img src={image} alt="Scansione" className="scanner-image" />
          <div className="scanner-overlay"></div>
          <div className="scanner-aura"></div>
        </div>
        
        <p style={{ color: 'var(--neon-cyan)', marginTop: '1.5rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Sincronizzazione frequenze animiche...
        </p>
      </div>
    </>
  );
}