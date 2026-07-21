// src/components/Card/Card.tsx
import { useRef } from 'react';
import { toPng } from 'html-to-image';
import type { Amulet } from '../../services/amuletSelector';
import './Card.css';

interface CardProps {
  amulet: Amulet;
}

export function Card({ amulet }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const dynamicGlow = {
    borderColor: amulet.color,
    boxShadow: `0 0 25px ${amulet.color}40`, 
  };

  const dynamicTextGlow = {
    color: amulet.color,
    textShadow: `0 0 10px ${amulet.color}80`,
  };

  // Funzione per generare il file PNG dalla scheda
  const generateImage = async (): Promise<string | null> => {
    if (!cardRef.current) return null;
    try {
      return await toPng(cardRef.current, { 
        cacheBust: true,
        pixelRatio: 2, // Mantiene un'alta risoluzione dell'immagine
      });
    } catch (err) {
      console.error("Errore durante la generazione dell'immagine:", err);
      return null;
    }
  };

  // Handler per scaricare l'immagine su PC o Smartphone
  const handleDownload = async () => {
    const dataUrl = await generateImage();
    if (dataUrl) {
      const link = document.createElement('a');
      link.download = `amuleto-${amulet.id || 'runaway'}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert("Impossibile generare l'immagine. Riprova tra un attimo.");
    }
  };

  // Handler per condividere nelle Storie di Instagram
  const handleInstagramShare = async () => {
    const dataUrl = await generateImage();
    if (!dataUrl) return;

    try {
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], `amuleto-${amulet.id}.png`, { type: 'image/png' });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Il mio Amuleto',
          text: `Ho scoperto il mio amuleto: ${amulet.name}!`,
        });
      } else {
        alert("La condivisione diretta non è supportata dal browser desktop. L'immagine verrà scaricata automaticamente per permetterti di caricarla manualmente.");
        handleDownload();
      }
    } catch (error) {
      console.error("Errore durante la condivisione:", error);
    }
  };

  return (
    <div className="card-wrapper">
      {/* Scheda dell'amuleto */}
      <div className="glass-card" style={dynamicGlow} ref={cardRef}>
        <h3 className="card-title" style={dynamicTextGlow}>
          {amulet.name}
        </h3>
        
        <p className="card-rarity" style={{ color: amulet.color }}>
          Rarità: {amulet.rarity}
        </p>

        {amulet.image && (
          <div className="card-image-container">
            <img 
              src={amulet.image} 
              alt={amulet.name} 
              className="card-image" 
            />
          </div>
        )}
        
        <div className="card-divider" style={{ backgroundColor: amulet.color }}></div>
        
        <p className="card-description">
          {amulet.description}
        </p>
      </div>

      {/* Pulsanti sotto la card */}
      <div className="card-actions">
        <button className="action-btn download-btn" onClick={handleDownload}>
          💾 Scarica Amuleto
        </button>
        <button className="action-btn insta-btn" onClick={handleInstagramShare}>
          📸 Condividi nelle Storie
        </button>
      </div>
    </div>
  );
}