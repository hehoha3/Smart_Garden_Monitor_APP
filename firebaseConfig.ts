import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDxVezbOAcTW_DCQgS1HIPOF2JEYMQ_Ku0",
    authDomain: "smart-garden-monitor-vfvp3n.firebaseapp.com",
    databaseURL: "https://smart-garden-monitor-vfvp3n-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "smart-garden-monitor-vfvp3n",
    storageBucket: "smart-garden-monitor-vfvp3n.firebasestorage.app",
    messagingSenderId: "733065430587",
    appId: "1:733065430587:web:9c6cc52df3a0eb74fabe1e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Database
const database = getDatabase(app);

// Export database
export { database };