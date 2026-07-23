// src/App.tsx
import { useState } from 'react';
import { Layout } from './components/Layout/Layout';
import { Home } from './pages/Home/Home';
import { Scan } from './pages/Scan/Scan';
import { Result } from './pages/Result/Result';
import type { Amulet } from './services/amuletSelector';
import type { Language } from './data/translations';

type Page = 'home' | 'scan' | 'result';

export function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  
  // Stato per la lingua (di default Italiano)
  const [lang, setLang] = useState<Language>('it');
  
  // Stato per l'amuleto estratto
  const [selectedAmulet, setSelectedAmulet] = useState<Amulet | null>(null);

  // Funzione che scatterà quando la fotocamera finisce il lavoro
  const handleScanComplete = (amulet: Amulet) => {
    setSelectedAmulet(amulet);
    setCurrentPage('result');
  };

  return (
    <Layout>
      {currentPage === 'home' && (
        <Home 
          lang={lang}
          onLanguageChange={(newLang) => setLang(newLang)}
          onStart={() => setCurrentPage('scan')} 
        />
      )}
      
      {currentPage === 'scan' && (
        <Scan 
          lang={lang} 
          onScanComplete={handleScanComplete} 
        /> 
      )}
      
      {currentPage === 'result' && selectedAmulet && (
        <Result 
          lang={lang} 
          amulet={selectedAmulet} 
        />
      )}
    </Layout>
  );
}

export default App;