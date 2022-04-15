import { fireStore } from "./firesbase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

export async function getDocument(path, id) {
  const documentPath = doc(fireStore, path, id);
  const document = await getDoc(documentPath);

  console.log("document data:", document.data());
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
