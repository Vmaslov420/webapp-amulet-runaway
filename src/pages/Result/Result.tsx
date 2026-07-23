// src/pages/Result/Result.tsx
import type { Amulet } from '../../services/amuletSelector';
import { Card } from '../../components/Card/Card';
import { translations, type Language } from '../../data/translations';

interface ResultProps {
  amulet: Amulet;
  lang?: Language;
}

export function Result({ amulet, lang = 'it' }: ResultProps) {
  // Otteniamo i testi tradotti
  const activeLang = translations[lang] ? lang : 'it';
  const t = translations[activeLang].card;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: '2rem' }}>
      <h2 style={{ color: 'var(--text-main)', textAlign: 'center' }}>
        {t.title || (activeLang === 'it' ? 'Il tuo Amuleto' : 'Your Amulet')}
      </h2>
      
      {/* Passiamo sia l'amuleto che la lingua attiva al componente Card */}
      <Card amulet={amulet} lang={activeLang} />
    </div>
  );
}