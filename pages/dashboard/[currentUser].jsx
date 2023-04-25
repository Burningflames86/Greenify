import { useAuth } from "../../AuthContext";
import { db, storage } from "@/firebase.config";
import { getDoc, setDoc, doc, arrayUnion } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

import { Karla } from "next/font/google";
import { Lora } from "next/font/google";
import NavBar from "@/Components/NavBar";
import { useState, useRef, useEffect } from "react";

import { useRouter } from "next/router";
import Head from "next/head";

const karla = Karla({ subsets: ['latin'] })
const lora = Lora({ subsets: ['latin'] })


export default function Dashboard({ item, quote }) {

  const router = useRouter();

  const { currentUser } = useAuth();
  const { logout } = useAuth();

  const [Name, setName] = useState("");
  const [Desc, setDesc] = useState("");
  const [imgURL, setimgURL] = useState("");
  const somefiles = useRef();
  const wholediv = useRef();

  const [data, setData] = useState();

  const imgSubmit = (e) => {
    console.log("asdfghj");
    const file = e.target.files[0];
    if (!file) {
      console.log("Nothing");
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

  const handleSubmit = async (e) => {
    const id = currentUser?.uid;

    e.preventDefault();
    console.log("submit");
    const docData = {
      Name: Name,
      Desc: Desc,
      imgURL: imgURL,
      name: currentUser?.displayName,
    };
    const realdata = {
      points: data.points + 10,
      sold: arrayUnion(docData),
    };
    await setDoc(doc(db, "Users", id), realdata, { merge: true });
    setName("");
    setDesc("");
    setimgURL("");
    somefiles.current.value = null;
  };

  useEffect(() => {
    if(!currentUser) {
      return
    }
    const unsub = async () => {
      const id = currentUser.uid;
      const docRef = doc(db, "Users", id);
      const docSnap = await getDoc(docRef);
      setData(docSnap.data());
    };
    return unsub;
  }, [currentUser]);

  const logoutHandler = async (e) => {
    e.preventDefault();
    await logout();
    router.push('/')

  };

  return (
    <>
    <Head>
      <title>Greenify-Dahsboard</title>
    </Head>
    <div className=" flex align-middle items-center justify-between pb-16 flex-col h-[100vh] bg-[#FEFAE0]">
        <div className={`-mt-12 ${lora.className} w-full `}><NavBar cancoin={true}/></div>

      {currentUser && (
        <div className="flex mt-10 w-[95%] mx-auto gap-x-10">
          <div className="rounded-full border-[5px] border-lime-950 w-[30rem]">
            {" "}
            <img
            alt="he"
              className="w-full h-full rounded-full"
              src={currentUser.photoURL}
              referrerPolicy="no-referrer"
            />{" "}
          </div>
          <div className="self-end w-[95%]">
          <div className="flex items-baseline pr-10 justify-between">
           {currentUser && <div className="text-5xl font-bold">{currentUser.displayName}</div>}
            <div className="flex font-bold text-lime-900 items-center gap-1"> <img alt="h" className="h-6 w-6 rounded-full" src="https://firebasestorage.googleapis.com/v0/b/greenify-dc70f.appspot.com/o/coin.png?alt=media&token=75d68cb1-314e-4cac-a462-369f306dce82" /> {item.points} </div>
        </div>
        <div className="my-5">Your Contribution: <strong> {item.sold.length} item</strong></div>
            <div className=""> <strong>FOTD: </strong> {quote}</div>
            <div className="flex gap-3 mt-3">
            <button onClick={() => {wholediv.current.style.display = "block"}} style={{boxShadow: '2px 8px 4px -5px #606C38'}} className={`${karla.className} w-[170px]  h-[50px] rounded-[35px] bg-[#FEFAE0] border-[6px] border-[#283618] text-[17px] leading-[20px] tracking-[0.04em] font-bold text-center flex justify-center donate items-center`}>CONTRIBUTE</button>
            <button style={{boxShadow: '2px 8px 4px -5px #606C38'}} className={`${karla.className} w-[170px]  h-[50px] rounded-[35px] bg-[#FEFAE0] border-[6px] border-[#283618] text-[17px] leading-[20px] tracking-[0.04em] font-bold text-center flex justify-center donate items-center`}>REDEEM</button>
          </div>
          </div>
          
        </div>
      )}
      <div
      style={{ boxShadow: "20px 10px 10px -5px #606C38" }}
      className={`absolute px-10 top-16 w-96  py-6 bg-[#fff3a7] hidden ${karla.className}`}
      ref={wholediv}
    >
    <button className="ml-[93%]" onClick={() => {wholediv.current.style.display = "none"}}>
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"  viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>
    </button>
      <form onSubmit={handleSubmit}>
        <div>
          <div className="text-3xl font-bold">Name</div>
          <input
            type="text"
            className="border-2 w-full px-3 h-10 border-black rounded-lg"
            defaultValue={Name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mt-4">
          <div className="text-3xl font-bold">Description</div>
          <input
            type="text"
            className="border-2 w-full px-3 h-10 border-black rounded-lg"
            value={Desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className="mt-4">
          <div className="text-3xl font-bold">Your Name</div>
          {currentUser && <input
            type="text"
            className="border-2 w-full px-3 h-10 border-black rounded-lg bg-[#fae76e]"
            value={currentUser.displayName}
          />}
        </div>
        <div>
          <div className="text-3xl font-bold pt-5">Image</div>
          <label>
            <input
              ref={somefiles}
              onChange={imgSubmit}
              type="file"
              className="text-sm text-grey-500
            file:mr-5 file:py-2 file:px-6
            file:rounded-full file:border-2 border-lime-800
            file:text-sm file:font-medium
            file:bg-white
            hover:file:cursor-pointer hover:file:bg-amber-50
            hover:file:text-amber-700
          "
            />
          </label>
        </div>
        <button
          onClick={() => {wholediv.current.style.display = "none"}}
          type="submit"
          style={{ boxShadow: "2px 8px 4px -5px #606C38" }}
          className={` w-[170px]  h-[50px] mt-6 mx-auto rounded-[35px] bg-[#FEFAE0] border-[6px] border-[#283618] text-[17px] leading-[20px] tracking-[0.04em] font-bold text-center flex justify-center donate items-center`}
        >
          CONTRIBUTE
        </button>
      </form>
    </div>
    <button onClick={logoutHandler} className="absolute text-4xl text-black hover:text-red-800 hover:cursor-pointer bottom-6 right-7"><i class="fa-solid fa-arrow-right-from-bracket"></i></button>
    </div>
    </>
  );
}

export async function getServerSideProps({ query }) {
  const id = query.currentUser;
  const docRef = doc(db, "Users", id);
  const docSnap = await getDoc(docRef);
  const item = docSnap.data();

  const url = "https://api.api-ninjas.com/v1/quotes?category=environmental";
  const options = {
    method: "GET",
    headers: { "x-api-key": "+mswnWDzoBPyg8phimoY9Q==BqaoPSI9sQ3MwU6C" },
  };

  try {
    const res = await fetch(url, options);
    const data = await res.json();
    const quote = data[0].quote;
    return {
      props: {
        item: item,
        quote: quote,
      },
    };
  } catch (error) {
    console.log(`error ${error}`);
  }
}
