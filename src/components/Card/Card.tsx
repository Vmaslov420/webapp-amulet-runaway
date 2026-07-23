// src/components/Card/Card.tsx
import { useRef } from 'react';
import { toPng } from 'html-to-image';
import type { Amulet, LocalizedString } from '../../services/amuletSelector';
import { translations, type Language } from '../../data/translations';
import './Card.css';

interface CardProps {
  amulet: Amulet;
  lang?: Language;
}

export function Card({ amulet, lang = 'it' }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Recuperiamo le traduzioni per la lingua attiva
  const activeLang = translations[lang] ? lang : 'it';
  const t = translations[activeLang].card;

  // Gestione dinamica per campi che potrebbero essere stringhe o oggetti multilingua
  const getLocalizedText = (field: LocalizedString | undefined): string => {
    if (!field) return '';
    if (typeof field === 'string') return field;
    return field[activeLang] || field.it || '';
  };

  const amuletName = getLocalizedText(amulet.name);
  const amuletRarity = getLocalizedText(amulet.rarity);
  const amuletDescription = getLocalizedText(amulet.description);

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

  // Helper per convertire un DataURL/Base64 in un oggetto File vero e proprio
  const dataUrlToFile = async (dataUrl: string, fileName: string): Promise<File> => {
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    return new File([blob], fileName, { type: 'image/png' });
  };

  // Handler universale per scaricare/salvare l'immagine (iOS, Android, PC)
  const handleDownload = async () => {
    const dataUrl = await generateImage();
    if (!dataUrl) {
      alert(activeLang === 'it' 
        ? "Impossibile generare l'immagine. Riprova tra un attimo."
        : "Unable to generate image. Please try again in a moment."
      );
      return;
    }

    try {
      const fileName = `amuleto-${amulet.id || 'runaway'}.png`;
      const file = await dataUrlToFile(dataUrl, fileName);

      // 1. SE SIAMO SU IOS / MOBILE con supporto alla condivisione di file
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: activeLang === 'it' ? 'Il mio Amuleto' : 'My Amulet',
        });
      } else {
        // 2. FALLBACK PER ANDROID / DESKTOP (Download diretto tramite Blob)
        const blobUrl = URL.createObjectURL(file);
        const link = document.createElement('a');
        link.download = fileName;
        link.href = blobUrl;
        document.body.appendChild(link);
        link.click();
        
        // Pulizia
        document.body.removeChild(link);
        setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
      }
    } catch (error) {
      // Ignora l'errore se l'utente annulla la condivisione su iOS
      if ((error as Error).name !== 'AbortError') {
        console.error("Errore durante il salvataggio:", error);
      }
    }
  };

  // Handler per condividere nelle Storie di Instagram
  const handleInstagramShare = async () => {
    const dataUrl = await generateImage();
    if (!dataUrl) return;

    try {
      const fileName = `amuleto-${amulet.id}.png`;
      const file = await dataUrlToFile(dataUrl, fileName);

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: activeLang === 'it' ? 'Il mio Amuleto' : 'My Amulet',
          text: activeLang === 'it' 
            ? `Ho scoperto il mio amuleto: ${amuletName}!`
            : `I discovered my amulet: ${amuletName}!`,
        });
      } else {
        alert(activeLang === 'it'
          ? "La condivisione diretta non è supportata dal browser desktop. L'immagine verrà scaricata automaticamente per permetterti di caricarla manualmente."
          : "Direct sharing is not supported on desktop browsers. The image will be downloaded automatically so you can upload it manually."
        );
        handleDownload();
      }
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        console.error("Errore durante la condivisione:", error);
      }
    }
  };

  return (
    <div className="card-wrapper">
      {/* Scheda dell'amuleto */}
      <div className="glass-card" style={dynamicGlow} ref={cardRef}>
        <h3 className="card-title" style={dynamicTextGlow}>
          {amuletName}
        </h3>
        
        <p className="card-rarity" style={{ color: amulet.color }}>
          {t.rarityPrefix}{amuletRarity}
        </p>

        {amulet.image && (
          <div className="card-image-container">
            <img 
              src={amulet.image} 
              alt={amuletName} 
              className="card-image" 
            />
          </div>
        )}
        
        <div className="card-divider" style={{ backgroundColor: amulet.color }}></div>
        
        <p className="card-description">
          {amuletDescription}
        </p>
      </div>

      {/* Pulsanti sotto la card */}
      <div className="card-actions">
        <button className="action-btn download-btn" onClick={handleDownload}>
          {t.downloadBtn}
        </button>
        <button className="action-btn insta-btn" onClick={handleInstagramShare}>
          {t.shareBtn}
        </button>
      </div>
    </div>
  );
}