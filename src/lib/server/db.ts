// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore, collection, DocumentReference, type DocumentData, DocumentSnapshot, query, where, getDocs } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5yIZYH0MsK2s9NasgYsu9NV0BZq63BvA",
  authDomain: "book-hall-nitc.firebaseapp.com",
  projectId: "book-hall-nitc",
  storageBucket: "book-hall-nitc.firebasestorage.app",
  messagingSenderId: "545821092012",
  appId: "1:545821092012:web:914c4d4f26ddf214fc1709",
  measurementId: "G-PS95X5DZ9B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

type User = {
  emailid: string,
  rollno: string,
  passhash: string
}

export async function getUser(emailid: string) {
  const userColl = collection(db, 'users')
  const userQ = query(userColl, where("emailid", '==', emailid));
  const querySnapshot = await getDocs(userQ);
  let docData;

  querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
    docData = doc.data()
    docData = {...docData, id: doc.id}
  });
  if (querySnapshot.empty) {
    return false
  }
  else {
    return docData
  }
}

export async function getSchedule(hall, start, end) {
  const schedColl = collection(db, 'schedule')
  const schedQ = query(schedColl, where('hall', '==', hall), where('start', '>', start), where('end', '<', end))
  const querySnap = await getDocs(schedQ);
  let res = []

  querySnap.forEach((doc) => {
    res.push(doc.data())
  })
  if (querySnap.empty) {
    return false
  }
  else {
    return res;
  }
}
