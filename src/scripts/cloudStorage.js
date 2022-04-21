import { ref } from "firebase/storage";
import { getDownloadURL, uploadBytes, deleteObject } from "firebase/storage";
import { cloudStorage } from "./firesbase";

export async function createFile(filePath, file) {
  const fileReference = ref(cloudStorage, filePath);
  await uploadBytes(fileReference, file);

  return await getDownloadURL(fileReference);
}
