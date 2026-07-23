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
      alert(activeLang === 'it' 
        ? "Impossibile generare l'immagine. Riprova tra un attimo."
        : "Unable to generate image. Please try again in a moment."
      );
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
      console.error("Errore durante la condivisione:", error);
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