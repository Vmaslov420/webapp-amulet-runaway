import React, { useState, useEffect } from 'react';
import { translations, type Language } from '../../data/translations';
import './Home.css';

interface HomeProps {
  onStart: () => void;
  lang?: Language; // Renders la prop opzionale per massima tolleranza
  onLanguageChange: (lang: Language) => void;
}

export const Home: React.FC<HomeProps> = ({ onStart, lang = 'it', onLanguageChange }) => {
  const [showSplash, setShowSplash] = useState<boolean>(true);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const [isExiting, setIsExiting] = useState<boolean>(false);

  // Gestione sicura del recupero testi: se lang non esiste, ripiega su 'it'
  const activeLang = translations[lang] ? lang : 'it';
  const t = translations[activeLang].home;

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 1800);

    const removeTimer = setTimeout(() => {
      setShowSplash(false);
    }, 2300);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  const currentYear = new Date().getFullYear();

  const handleStart = () => {
    setIsExiting(true);
    setTimeout(() => {
      onStart();
    }, 400);
  };

  return (
    <div className="home-container">
      {showSplash ? (
        <div className={`splash-screen ${isFadingOut ? 'fade-out' : ''}`}>
          <img 
            src="/RUNAWAY.png" 
            alt="Logo Runaway" 
            className="splash-logo" 
          />
        </div>
      ) : (
        <div className={`main-content ${isExiting ? 'page-exit' : ''}`}>
          
      {/* --- SELETTORE LINGUA CON IMMAGINI BANDIERE --- */}
      <div className="language-selector">
        <button 
          className={`flag-btn ${activeLang === 'it' ? 'active' : ''}`}
          onClick={() => onLanguageChange('it')}
          aria-label="Italiano"
        >
          <img src="/images/flags/it.svg" alt="Italiano" className="flag-icon" />
        </button>
        
        <button 
          className={`flag-btn ${activeLang === 'en' ? 'active' : ''}`}
          onClick={() => onLanguageChange('en')}
          aria-label="English"
        >
          <img src="/images/flags/gb.svg" alt="English" className="flag-icon" />
        </button>
      </div>

          <header className="header-title">
            <h1>RUNAWAY</h1>
            <p>{t.subtitle}</p>
          </header>

          <main className="buttons-section">
            <button className="primary-button" onClick={handleStart}>
              {t.startButton}
            </button>
          </main>

          <footer className="footer-title">
            <p>{t.subtitle} VOL.3 • {currentYear}</p>
          </footer>
        </div>
      )}
    </div>
  );
};

export default Home;