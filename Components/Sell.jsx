import React, { useState, useRef } from 'react';
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; 
import { db } from '@/firebase.config';
import { storage } from '@/firebase.config';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";


export default function Sell() {
    const [Name, setName] = useState('')
    const [Desc, setDesc] = useState('')
    const [Price, setPrice] = useState('')
    const [imgURL, setimgURL] = useState('')
    const [catos, setCatos] = useState('')
    const [gender, setGender] = useState('')
    const somefiles = useRef();

    const handleSubmit = async(e) => {
        e.preventDefault()
        console.log('submit')
        const docData = {
            Name: Name,
            Desc: Desc,
            Price: Price,
            imgURL: imgURL,
            Gender: gender,
            Catos: catos,
            createdAt: serverTimestamp(),
        };
        await addDoc(collection(db, "Selling Objects"), docData);
        // setName('')
        setDesc('')
        setPrice('')
        setimgURL('')
        somefiles.current.value = null;
    }

    const imgSubmit = (e) => {
        console.log('asdfghj')
        const file = e.target.files[0];
        if (!file) {
            console.log('Nothing')
          return;
        }
        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
    
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            console.log(progress);
          },
          (error) => {
            alert(error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            setimgURL(downloadURL);
          }
        );
      };
  return (

    <div>
      <form  onSubmit={handleSubmit}>
        <input type="text" placeholder='Name' value={Name} onChange={(e) => setName(e.target.value)}/>
        <input type="text" placeholder='Desc'  value={Desc} onChange={(e) => setDesc(e.target.value)}/>
        <input type="number" placeholder='Price'  value={Price} onChange={(e) => setPrice(e.target.value)}/>
        <input type="text" placeholder='Categories'  value={catos} onChange={(e) => setCatos(e.target.value)}/>
        <input type="text" placeholder='Gender'  value={gender} onChange={(e) => setGender(e.target.value)}/>
        <input ref={somefiles} type="file" onChange={imgSubmit} />
      <button type="submit">Do the thing</button>

      </form>
    </div>
  )
}
