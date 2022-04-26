import React, { useState } from "react";
import "firebase/compat/storage";
import { storage } from "./FirebaseConfig";
import { ref, getDownloadURL } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyAn4hvIIraWdh-MmmOVL2vb-8Ji4LSH_SU",
//   authDomain: "oto-a6dev.firebaseapp.com",
//   projectId: "oto-a6dev",
//   storageBucket: "oto-a6dev.appspot.com",
//   messagingSenderId: "1060182708095",
//   appId: "1:1060182708095:web:ba55b28e5eabd5fe9b944a",
//   measurementId: "G-DX1YV0DJ11",
// };

// firebase.initializeApp(firebaseConfig);
// const storage = firebase.storage();

const starsRef = ref(storage, "images.jpg");

export default function Firebase() {
  const [data, setData] = useState([]);
  const [image, setImage] = useState("");
  console.log("data", data);

  const listItem = () => {
    getDownloadURL(starsRef).then((url) => {
      console.log("url", url);
    });
  };
  return <div onClick={listItem}>Firebase</div>;
}
