import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCHQ9_mUK07QKI3jHC0DumvgHs6h7FEO2I",
  authDomain: "tech-geek-blogs.firebaseapp.com",
  projectId: "tech-geek-blogs",
  storageBucket: "tech-geek-blogs.appspot.com",
  messagingSenderId: "986460176573",
  appId: "1:986460176573:web:fd42c75394b2788e37f7d4",
};

const app = initializeApp(firebaseConfig);

export default app;
