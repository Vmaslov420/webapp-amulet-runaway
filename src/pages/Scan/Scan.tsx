// src/pages/Scan/Scan.tsx
import { useState } from 'react';
import { Camera } from '../../components/Camera/Camera';
import { Scanner } from '../../components/Scanner/Scanner';
import { getAmuletFromImage } from '../../services/amuletSelector';
import type { Amulet } from '../../services/amuletSelector';

interface ScanProps {
  onScanComplete: (amulet: Amulet) => void;
}

export function Scan({ onScanComplete }: ScanProps) {
  // Memorizziamo la foto appena scattata
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  
  // Memorizziamo l'amuleto calcolato, ma aspettiamo a passarlo all'App
  const [calculatedAmulet, setCalculatedAmulet] = useState<Amulet | null>(null);

  // Questa funzione scatta istantaneamente quando clicchi "Analizza Anima"
  const handleCapture = (base64Image: string) => {
    // 1. Facciamo il calcolo deterministico immediatamente e in segreto
    const amulet = getAmuletFromImage(base64Image);
    setCalculatedAmulet(amulet);
    
    // 2. Salviamo l'immagine. Questo farà sparire la Camera e apparire lo Scanner!
    setCapturedImage(base64Image);
  };

  // Se abbiamo scattato una foto, mostriamo l'animazione del laser
  if (capturedImage && calculatedAmulet) {
    return (
      <Scanner 
        image={capturedImage} 
        // Quando lo Scanner ha finito i suoi 5 secondi, passiamo l'amuleto finale all'App
        onComplete={() => onScanComplete(calculatedAmulet)} 
      />
    );
  }

  // Altrimenti (stato iniziale), mostriamo la fotocamera
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <h2 style={{ color: 'var(--neon-purple)', marginBottom: '1.5rem', textAlign: 'center' }}>
        Mantieni il viso visibile
      </h2>
      
      <Camera onCapture={handleCapture} />
    </div>
  );
}