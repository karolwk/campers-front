import { initializeApp } from 'firebase/app';
import {
  DocumentSnapshot,
  getFirestore,
  QuerySnapshot,
} from 'firebase/firestore';
import { Firestore } from 'firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

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

// Fetch page data and return snapshot

export const fetchPageData = async (): Promise<DocumentSnapshot> => {
  const docRef = doc(
    db,
    process.env.FIREBASE_DB_PAGEDATA_COL as string,
    process.env.FIREBASE_DB_PAGEDATA_DOC as string
  );
  const docSnap = await getDoc(docRef);
  return docSnap;
};

// Gets all data from refrences
export const fetchRefs = async (refs: []) =>
  await Promise.all(
    refs.map(async (ele) => {
      try {
        const testSnap = await getDoc(ele);
        return testSnap.data();
      } catch (error) {
        console.log('Error in refrence fetching: ' + error);
      }
    })
  );

// Fetch all campers with their refrences from collection
export const fetchCampers = async (campersSnapshot: QuerySnapshot) => {
  const camperList = [] as any[];
  // build campers array from camper collection snapshot
  campersSnapshot.forEach((doc) => {
    camperList.push(doc.data());
  });

  return Promise.all(
    camperList.map(async (camper: any) => {
      // get data for each amenity
      camper.mainAmenities = await fetchRefs(camper.mainAmenities);
      return camper;
    })
  );
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export const fireStorage = getStorage(app);

export default db;
