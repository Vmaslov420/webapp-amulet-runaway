// src/components/Camera/Camera.tsx
import { useEffect, useRef } from 'react';
import { Button } from '../Button/Button';
import './Camera.css';

interface CameraProps {
  // onCapture è una funzione che il componente padre (Scan) ci passa. 
  // La chiameremo passandogli la foto sotto forma di stringa di testo.
  onCapture: (base64Image: string) => void;
}

export function Camera({ onCapture }: CameraProps) {
  // 1. Creiamo i "ganci" (refs)
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // 2. Accendiamo e spegniamo la fotocamera
  useEffect(() => {
    async function startCamera() {
      try {
        // Chiediamo l'accesso alla fotocamera frontale (facingMode: 'user')
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user' }
        });
        
        // Salviamo il flusso di dati e lo colleghiamo al tag <video>
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Errore nell'accesso alla fotocamera:", error);
        alert("Per favore, consenti l'accesso alla fotocamera per continuare.");
      }
    }

    startCamera();

    // La funzione restituita da useEffect (chiamata "cleanup function") 
    // scatta quando il componente viene distrutto (es. cambiando pagina)
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []); // L'array vuoto [] significa: "Esegui questo effetto solo una volta all'avvio"

  // 3. Il trucco per scattare la foto
  const takePhoto = () => {
    if (!videoRef.current) return;

    // Creiamo un canvas "al volo" nella memoria
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    
    const context = canvas.getContext('2d');
    if (context) {
      // Specchiamo il canvas per far combaciare l'immagine con quello che vede l'utente
      //context.translate(canvas.width, 0);
      //context.scale(-1, 1);
      
      // Disegniamo il fotogramma esatto bloccato in quel millisecondo
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      
      // Trasformiamo l'immagine in testo. Lo '0.8' è la qualità JPEG (80%) per comprimerla
      const base64Image = canvas.toDataURL('image/jpeg', 0.8);
      onCapture(base64Image);
    }
  };

  return (
    <>
      <div className="camera-container">
        <video 
          ref={videoRef} 
          autoPlay 
          // playsInline è FONDAMENTALE su iOS per evitare che il video parta a schermo intero
          playsInline 
          className="camera-video"
        />
      </div>
      <div className="camera-action-area">
        <Button variant="purple" onClick={takePhoto}>
          Analizza Anima
        </Button>
      </div>
    </>
  );
}