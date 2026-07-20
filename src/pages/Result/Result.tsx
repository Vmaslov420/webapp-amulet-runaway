// src/pages/Result/Result.tsx
import type { Amulet } from '../../services/amuletSelector';
import { Card } from '../../components/Card/Card';

interface ResultProps {
  amulet: Amulet;
}

export function Result({ amulet }: ResultProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: '2rem' }}>
      <h2 style={{ color: 'var(--text-main)', textAlign: 'center' }}>
        Il tuo Amuleto
      </h2>
      
      {/* Usiamo il nostro nuovo componente e gli passiamo i dati! */}
      <Card amulet={amulet} />
      
    </div>
  );
}