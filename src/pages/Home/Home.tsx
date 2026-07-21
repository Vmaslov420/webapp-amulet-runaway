import React, { useState, useEffect } from 'react';
import './Home.css';

interface HomeProps {
  onStart: () => void;
}

export const Home: React.FC<HomeProps> = ({ onStart }) => {
  const [showSplash, setShowSplash] = useState<boolean>(true);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const [isExiting, setIsExiting] = useState<boolean>(false);

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

  // Gestisce il click sul pulsante avviando la transizione prima del cambio pagina
  const currentYear = new Date().getFullYear();
  const handleStart = () => {
    setIsExiting(true);
    setTimeout(() => {
      onStart();
    }, 400); // 400ms corrisponde alla durata dell'animazione 'fadeOutPage'
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
          <header className="header-title">
            <h1>RUNAWAY</h1>
            <p>SUPERSTIZIONI ELETTRONICHE</p>
          </header>

          <main className="buttons-section">
            <button className="primary-button" onClick={handleStart}>
              AVVIA SCANSIONE
            </button>
          </main>

          <footer className="footer-title">
            <p> SUPERSTIZIONI ELETTRONICHE VOL.3 • {currentYear}</p>
          </footer>
        </div>
      )}
    </div>
  );
};

export default Home;