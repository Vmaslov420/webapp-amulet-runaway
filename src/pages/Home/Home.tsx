// src/pages/Home/Home.tsx
import { Button } from '../../components/Button/Button';

interface HomeProps {
  onStart: () => void;
}

export function Home({ onStart }: HomeProps) {
  return (
    <div style={{ textAlign: 'center', width: '100%' }}>
      <h2 style={{ color: 'var(--neon-cyan)', marginBottom: '0.5rem' }}>Pronto alla Scansione?</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
        Scopri l'amuleto protettivo per la tua serata.
      </p>
      
      <Button onClick={onStart}>
        Inizia Scansione
      </Button>
    </div>
  );
}