// src/data/translations.ts

export type Language = 'it' | 'en';

export const translations = {
  it: {
    home: {
      subtitle: "SUPERSTIZIONI ELETTRONICHE",
      startButton: "AVVIA SCANSIONE",
    },
    camera: {
      title: "Mantieni il viso visibile",
      button: "ANALIZZA ANIMA",
      alertError: "Per favore, consenti l'accesso alla fotocamera per continuare.",
    },
    scanner: {
      reading: "Lettura in corso...",
      syncing: "Sincronizzazione frequenze animiche...",
    },
    card: {
      title: "Il tuo Amuleto",
      rarityPrefix: "Rarità: ",
      downloadBtn: "💾 Scarica Amuleto",
      shareBtn: "📸 Condividi nelle Storie",
    }
  },
  en: {
    home: {
      subtitle: "ELECTRONIC SUPERSTITIONS",
      startButton: "START SCAN",
    },
    camera: {
      title: "Keep your face visible",
      button: "ANALYZE SOUL",
      alertError: "Please allow camera access to continue.",
    },
    scanner: {
      reading: "Reading in progress...",
      syncing: "Synchronizing soul frequencies...",
    },
    card: {
      title: "Your Amulet",
      rarityPrefix: "Rarity: ",
      downloadBtn: "💾 Download Amulet",
      shareBtn: "📸 Share to Stories",
    }
  }
};