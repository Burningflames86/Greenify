import {
  doc,
  getDoc,
  getDocs,
  setDoc,
  query,
  where,
  collection,
} from "firebase/firestore";
import { db } from "@/firebase.config";
import NavBar from "@/Components/NavBar";

import { Karla } from "next/font/google";
import { Lora } from "next/font/google";
import Script from "next/script";

const karla = Karla({ subsets: ["latin"] });
const lora = Lora({ subsets: ["latin"] });

import { useAuth } from "@/AuthContext";
import { useEffect, useState, useRef } from "react";

import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";

export default function Things({ item }) {
  const router = useRouter();
  const { currentUser } = useAuth();
  const [data, setData] = useState();
  const [more, setMore] = useState();
  const warn = useRef();
  const done = useRef();
  const id = currentUser?.uid;

  useEffect(() => {
    if(!currentUser){
      return
    }
    const unsub = async () => {
      const docRef = doc(db, "Users", id);
      const docSnap = await getDoc(docRef);
      setData(docSnap.data());
    };
    return unsub;
  }, [db, currentUser]);

  const purchaseHandler = async () => {
    if (data.points < item.Price) {
      warn.current.style.visibility = "visible";
      warn.current.classList.add("warn");
      setTimeout(() => {
        warn.current.classList.remove("warn");
        warn.current.style.visibility = "hidden";
      }, 500);

      console.log(warn.current.style.dispay);
      console.log("You have");
      return;
    }
    const docRef = doc(db, "Users", id);
    await setDoc(docRef, { points: data.points - item.Price, sold: data.sold });
    done.current.style.visibility = "visible";
    router.push(`dashboard/${currentUser.uid}`);
    console.log("Ye");
  };

  useEffect(() => {
    const unsub = async () => {
      const q = query(
        collection(db, "Selling Objects"),
        where("Catos", "==", item.Catos)
      );
      const querySnapshot = await getDocs(q);
      const itemsArray = [];
      querySnapshot.forEach((doc) => {
        itemsArray.push({
          id: doc.id,
          Name: doc.data().Name,
          Price: doc.data().Price,
          imgURL: doc.data().imgURL,
        });
      });
      setMore(itemsArray);
    };

    return unsub;
  }, [db]);

  return (
    <>
    <Head>
      <title>{item.Name}</title>
    </Head>
      <Script
        src="https://kit.fontawesome.com/989b026094.js"
        crossOrigin="anonymous"
      ></Script>
      <main className={`bg-[#FEFAE0] ${karla.className} pb-10`}>
        <div className={`-mt-12 ${lora.className}`}>
          <NavBar cancoin={true} />
        </div>
        <div className="flex w-[99%] ml-3  mt-12 items-end ">
          <div className=" h-[27rem] w-[27rem]">
            <img className="w-full h-full" src={item.imgURL} alt="" />
          </div>
          <div className="max-w-[53rem] pl-10">
            <h1 className="text-5xl text-lime-800">
              {" "}
              <strong> {item.Name}</strong>
            </h1>
            <div className="text-2xl flex gap-1 justify-end items-center pr-10 mb-3"> <img className="h-6 w-6 rounded-full" src="https://firebasestorage.googleapis.com/v0/b/greenify-dc70f.appspot.com/o/coin.png?alt=media&token=75d68cb1-314e-4cac-a462-369f306dce82" /> <div> {item.Price}</div></div>
            <div className="text-md tracking-tight font-semibold leading-6 mb-3">
              {item.Desc}{" "}
            </div>
            <button
              onClick={purchaseHandler}
              style={{ boxShadow: "2px 8px 4px -5px #606C38" }}
              className={`${karla.className} w-[250px]  h-[63px] rounded-[35px] bg-[#FEFAE0] border-[6px] border-[#283618] text-[17px] leading-[20px] tracking-[0.04em] font-bold text-center flex justify-center donate items-center`}
            >
              BUY
            </button>
          </div>
        </div>
        {item.Name !== "The Merch" && 
        <div
          className={`mt-20 text-center text-[25px] leading-[29px] tracking-[0.14em] font-extrabold text-[#606C38]`}
        >
          <h1>More Like This</h1>
        </div>}
        <div className=" arrivedcontainer text-green-700 mx-24 mt-12">
        {more &&
          more.map((cloth) => (
            item.Name != cloth.Name && <Link
              key={cloth.id}
              href={`/${cloth.id}`}
              style={{
                background: `url("${cloth.imgURL}")`,
                backgroundColor: "transparent",
                backgroundBlendMode: "multiply",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="w-80 h-96  relative arrival rounded-[34px]"
            >
            <div className="upping bottom-0 absolute text-sm text-white leading-[0.02em] tracking-[0.02em] px-4 bg-[#0C0B0B3D] rounded-b-[34px] py-8 w-[99.9%] flex justify-between">
                <div className={`${karla.className} upping`}>{cloth.Name}</div>
                <div className={`${karla.className} upping`}>{cloth.Price}</div>
             </div> 
            </Link>
          ))}
          </div>
      </main>
      <div
        style={{ boxShadow: "20px 10px 10px -5px #606C38" }}
        ref={warn}
        className={` ${karla.className} absolute invisible  text-3xl font-bold m-auto left-0 right-0 bottom-0 top-0 h-[4.5rem] bg-[#f93b3b] text-center w-80 py-5 text-white`}
      >
        Insufficient Coins
      </div>
      <div
        style={{ boxShadow: "20px 10px 10px -5px #606C38" }}
        ref={done}
        className={` ${karla.className} absolute invisible  text-3xl font-bold m-auto left-0 right-0 bottom-0 top-0 h-[9rem] bg-[#2c5819] text-center w-80 pt-5 text-white`}
      >
        Purhased Successfully{" "}
        <div className="text-lg">Redirecting to Dashboard ...</div>
      </div>
    </>
  );
}

export async function getServerSideProps({ query }) {
  const id = query.item;
  const docRef = doc(db, "Selling Objects", id);
  const docSnap = await getDoc(docRef);
  const item = docSnap.data();

  // Exclude createdAt field from item object
  const { createdAt, ...itemWithoutCreatedAt } = item;

  return {
    props: {
      item: itemWithoutCreatedAt,
    },
  };
}
