import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAQOmGdg4pwu8I0G9KDFEBTlnQyc3ZFyT0",
  authDomain: "nudgie-def7c.firebaseapp.com",
  projectId: "nudgie-def7c",
  storageBucket: "nudgie-def7c.firebasestorage.app",
  messagingSenderId: "617809838072",
  appId: "1:617809838072:web:10d3553227364219d0200d"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
