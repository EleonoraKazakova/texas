import { fireStore } from "./firesbase";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

export async function updateDocument(path, data) {
  const documentPath = doc(fireStore, path);
  await updateDoc(documentPath, data);
}

export async function addDocument(path, data) {
  const documentPath = doc(fireStore, path);
  await setDoc(documentPath, data);
}

export async function getDocument(path) {
  const documentPath = doc(fireStore, path);
  const document = await getDoc(documentPath);
  return document.data();
}

export async function getCollection(path) {
  const collectionPath = collection(fireStore, path);
  const snapshot = await getDocs(collectionPath);

  const documents = snapshot.docs.map((item) => {
    return { id: item.id, ...item.data() };
  });

  return documents;
}

export async function deleteDocument(path) {
  const documentPath = doc(fireStore, path);
  await deleteDoc(documentPath);
}
