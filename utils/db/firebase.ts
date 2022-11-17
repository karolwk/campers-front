import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { Firestore } from 'firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';

const firebaseConfig = {
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

export const fetchFBData = async <T>(
  database: Firestore,
  collection: string,
  document: string
): Promise<T | unknown> => {
  const docRef = doc(database, collection, document);
  try {
    const docSnap = await getDoc(docRef);
    return docSnap.data() as T;
  } catch (error) {
    return error;
  }
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export default db;
