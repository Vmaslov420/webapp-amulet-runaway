// src/services/amuletSelector.ts

// Importiamo il file JSON direttamente. TypeScript capisce in automatico la sua struttura!
import amuletsData from '../data/amulets.json';

// Tipo helper per i testi multilingua
export type LocalizedString = string | {
  it: string;
  en: string;
};

// Definiamo come è fatto un amuleto per supportare sia stringhe che oggetti multilingua
export interface Amulet {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
  color: string;
  rarity: LocalizedString;
  image: string;
}

/**
 * Funzione di Hash (Algoritmo DJB2)
 * Prende una stringa lunghissima e la trasforma in un numero intero.
 */
function hashStringToInt(str: string): number {
  let hash = 5381; // Numero magico di partenza dell'algoritmo
  
  // Cicliamo ogni singolo carattere della stringa
  for (let i = 0; i < str.length; i++) {
    // Spostiamo i bit e aggiungiamo il valore numerico (codice ASCII) del carattere
    hash = ((hash << 5) + hash) + str.charCodeAt(i);
  }
  
  // Restituiamo il valore assoluto per evitare numeri negativi
  return Math.abs(hash);
}

/**
 * Funzione principale: prende l'immagine e restituisce l'amuleto.
 */
export function getAmuletFromImage(base64Image: string): Amulet {
  // 1. Trasformiamo l'immagine in un numero gigante
  const imageHash = hashStringToInt(base64Image);
  
  // 2. Usiamo il Modulo per trovare l'indice esatto nel nostro array
  const index = imageHash % amuletsData.length;
  
  // 3. Restituiamo l'amuleto corrispondente
  return amuletsData[index] as Amulet;
}