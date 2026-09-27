import {
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  deleteObject
} from "firebase/storage";

import { storage } from "../firebase";

export async function uploadHobbyFile(uid, file) {
  const fileRef = ref(
    storage,
    `hobby-files/${uid}/${Date.now()}-${file.name}`
  );

  await uploadBytes(fileRef, file);

  return await getDownloadURL(fileRef);
}

export async function getHobbyFiles(uid) {
  const folderRef = ref(
    storage,
    `hobby-files/${uid}`
  );

  const result = await listAll(folderRef);

  const files = await Promise.all(
    result.items.map(async (item) => {
      return {
        name: item.name,
        url: await getDownloadURL(item),
        ref: item
      };
    })
  );

  return files;
}

export async function deleteHobbyFile(fileRef) {
  await deleteObject(fileRef);
}