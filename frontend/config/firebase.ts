
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import fs from "fs";
const firebaseConfig = {
  apiKey: "AIzaSyCQIy6g2ppZYqugVFmeWU7v4VXjwton3gI",
  authDomain: "shikaricv.firebaseapp.com",
  projectId: "shikaricv",
  storageBucket: "shikaricv.appspot.com",
  messagingSenderId: "496227029743",
  appId: "1:496227029743:web:4817b74067c1dc7925c11a",
  measurementId: "G-XD6TKMNQD5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export const uploadToFileFirebase = async (
   filePath : string,
  ): Promise<string | undefined> => {
    if (filePath) {
    const files = await fs.readFileSync(filePath);
    const contentType = "application/pdf";

      const folderPath = `pdfs/${Date.now()}.pdf`;
      const imageRef = ref(storage, folderPath);
  
      try {
        const snapshot = await uploadBytes(imageRef, files);
        const url = await getDownloadURL(snapshot.ref);
        return url;
      } catch (error) {
        console.log("Error uploading image:", error);
        return undefined;
      }
    } else {
      return undefined;
    }
  };