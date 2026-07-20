// src/App.tsx
import { useState } from 'react';
import { Layout } from './components/Layout/Layout';
import { Home } from './pages/Home/Home';
import { Scan } from './pages/Scan/Scan';
import { Result } from './pages/Result/Result';
import type { Amulet } from './services/amuletSelector'; // Importiamo il tipo!

type Page = 'home' | 'scan' | 'result';

export function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  
  // Nuovo stato: qui memorizziamo l'amuleto una volta calcolato.
  // All'inizio è 'null' perché non abbiamo ancora scattato nessuna foto.
  const [selectedAmulet, setSelectedAmulet] = useState<Amulet | null>(null);

  // Funzione che scatterà quando la fotocamera finisce il lavoro
  const handleScanComplete = (amulet: Amulet) => {
    setSelectedAmulet(amulet); // Salviamo l'amuleto
    setCurrentPage('result');  // Andiamo alla pagina finale
  };

  return (
    <Layout>
      {currentPage === 'home' && (
        <Home onStart={() => setCurrentPage('scan')} />
      )}
      
      {currentPage === 'scan' && (
        // Passiamo la nuova funzione alla pagina Scan
        <Scan onScanComplete={handleScanComplete} /> 
      )}
      
      {currentPage === 'result' && selectedAmulet && (
        // Passiamo l'amuleto scelto alla pagina Result (che costruiremo dopo)
        <Result amulet={selectedAmulet} />
      )}
    </Layout>
  );
}