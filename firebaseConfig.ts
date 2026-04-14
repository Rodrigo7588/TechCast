import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDhCgC-k4ji6awfaV57A_U_h0VHIkLDye8",
  authDomain: "techcast-d269e.firebaseapp.com",
  projectId: "techcast-d269e",
  storageBucket: "techcast-d269e.firebasestorage.app",
  messagingSenderId: "856688273262",
  appId: "1:856688273262:web:2ec83ee9a008b23518c37f",
  measurementId: "G-40GV3FTV69"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o Banco de Dados Firestore e exporta para usarmos nas telas
export const db = getFirestore(app);