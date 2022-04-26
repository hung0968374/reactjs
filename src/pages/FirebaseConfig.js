import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Set the configuration for your app
// TODO: Replace with your app's config object
const firebaseConfig = {
  apiKey: "AIzaSyAn4hvIIraWdh-MmmOVL2vb-8Ji4LSH_SU",
  authDomain: "oto-a6dev.firebaseapp.com",
  databaseURL: "https://oto-a6dev-default-rtdb.firebaseio.com",
  projectId: "oto-a6dev",
  storageBucket: "oto-a6dev.appspot.com",
  messagingSenderId: "1060182708095",
  appId: "1:1060182708095:web:ba55b28e5eabd5fe9b944a",
  measurementId: "G-DX1YV0DJ11",
};
const firebaseApp = initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
export const storage = getStorage(firebaseApp);
