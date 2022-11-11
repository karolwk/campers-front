import admin from 'firebase-admin';
import { getStorage } from 'firebase-admin/storage';

const firebaseConfig = {
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  //@ts-ignore
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(firebaseConfig),
    });
  } catch (error: any) {
    console.log('Firebase admin initialization error', error.stack);
  }
}

export const storage = getStorage();

export default admin.firestore();
