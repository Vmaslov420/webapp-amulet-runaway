// src/components/Card/Card.tsx
import type { Amulet } from '../../services/amuletSelector';
import './Card.css';

interface CardProps {
  amulet: Amulet;
}

export function Card({ amulet }: CardProps) {
  // Generiamo gli stili dinamici basati sul colore specifico dell'amuleto
  const dynamicGlow = {
    borderColor: amulet.color,
    // Uniamo il colore a un'ombra per l'effetto neon (40 alla fine indica la trasparenza)
    boxShadow: `0 0 25px ${amulet.color}40`, 
  };

  const dynamicTextGlow = {
    color: amulet.color,
    textShadow: `0 0 10px ${amulet.color}80`,
  };

  return (
    <div className="glass-card" style={dynamicGlow}>
      <h3 className="card-title" style={dynamicTextGlow}>
        {amulet.name}
      </h3>
      
      <p className="card-rarity" style={{ color: amulet.color }}>
        Rarità: {amulet.rarity}
      </p>
      
      <div className="card-divider" style={{ backgroundColor: amulet.color }}></div>
      
      <p className="card-description">
        {amulet.description}
      </p>
    </div>
  );
}