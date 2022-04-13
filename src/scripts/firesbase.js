import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC2gh8N9o817mvflkS7xjyEZtMs2mNcOws",
  authDomain: "texas-4fc60.firebaseapp.com",
  databaseURL: "https://texas-4fc60-default-rtdb.firebaseio.com",
  projectId: "texas-4fc60",
  storageBucket: "texas-4fc60.appspot.com",
  messagingSenderId: "931919317598",
  appId: "1:931919317598:web:e15d6cbc62615f3dde82cf",
};

const app = initializeApp(firebaseConfig);
export const fireStore = getFirestore(app);
