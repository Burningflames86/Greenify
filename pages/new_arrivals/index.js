import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "@/firebase.config";
import { useEffect, useState } from "react";
import Link from "next/link";
import NavBar from "@/Components/NavBar";
import { Lora } from "next/font/google";
import { Karla } from "next/font/google";
const lora = Lora({ subsets: ["latin"] });
const karla = Karla({ subsets: ["latin"] });
import Script from "next/script";
import Head from "next/head";

export default function Home() {
  const [items, setItems] = useState([]);
  const [premium, setPremium] = useState([]);

  useEffect(() => {
    const getdata = async () => {
      const querySnapshot = await getDocs(query(collection(db, "Selling Objects"), where("Gender", "!=" ,"Women")));
      let itemsArray = [];
      querySnapshot.forEach((doc) => {
        itemsArray.push({
          id: doc.id,
          Name: doc.data().Name,
          Price: doc.data().Price,
          imgURL: doc.data().imgURL,
          Catos: doc.data().Catos,

        });
      });
      itemsArray = itemsArray.filter(
        (item) => item.Catos != "PreShirts"
      );
      setItems(fyShuffle(itemsArray.reverse()));

    };
    getdata();
  }, []);

  useEffect(() => {
    const getdata = async () => {
      const querySnapshot = await getDocs(query(collection(db, "Selling Objects"),where("Gender", "==", "Women")));
      const itemsArray = [];
      querySnapshot.forEach((doc) => {
        itemsArray.push({
          id: doc.id,
          Name: doc.data().Name,
          Price: doc.data().Price,
          imgURL: doc.data().imgURL,
          Gender: doc.data().Gender,
          Catos: doc.data().Catos,
        });
      });
      setPremium(fyShuffle(itemsArray.reverse()));
    };
    getdata();
  }, []);


  function fyShuffle(arr) {
    let i = arr.length;
    while (--i > 0) {
      let randIndex = Math.floor(Math.random() * (i + 1));
      [arr[randIndex], arr[i]] = [arr[i], arr[randIndex]];
    }
   
    return arr;
  }

  return (
    <>
    <Head>
        <title>Greenify-New Arrivals</title>
    </Head>
      <Script
        src="https://kit.fontawesome.com/989b026094.js"
        crossOrigin="anonymous"
      ></Script>
      {/* <Sell/> */}
      <main className={`${lora.className} bg-[#FEFAE0] pb-1`}>

        <NavBar/>
       
        
        <div className="flex flex-wrap items-center justify-between align-middle text-green-700 mx-24 gap-4">
          {items.map(
            (item, i) =>
             (
                <Link
                  href={`/${item.id}`}
                  key={item.id}
                  style={{
                    background: `url("${item.imgURL}")`,
                    backgroundColor: "transparent",
                    backgroundBlendMode: "multiply",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  className="w-80 h-96 relative arrival rounded-[34px]"
                >
                  <div className="upping bottom-0 absolute text-sm text-white leading-[0.02em] tracking-[0.02em] px-4 bg-[#0C0B0B3D] rounded-b-[34px] py-8 w-[99.9%] flex justify-between">
                    <div className={`${karla.className} upping`}>
                      {item.Name}
                    </div>
                    <div className={`${karla.className} upping`}>
                      {item.Price}
                    </div>
                  </div>
                </Link>
              )
          )}
        </div>
        <div className="flex flex-wrap items-center justify-between align-middle text-green-700 mx-24 gap-4">
          {premium.map(
            (item, i) =>
             (
                <Link
                  href={`/${item.id}`}
                  key={item.id}
                  style={{
                    background: `url("${item.imgURL}")`,
                    backgroundColor: "transparent",
                    backgroundBlendMode: "multiply",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  className="w-80 h-96 relative arrival rounded-[34px]"
                >
                  <div className="upping bottom-0 absolute text-sm text-white leading-[0.02em] tracking-[0.02em] px-4 bg-[#0C0B0B3D] rounded-b-[34px] py-8 w-[99.9%] flex justify-between">
                    <div className={`${karla.className} upping`}>
                      {item.Name}
                    </div>
                    <div className={`${karla.className} upping`}>
                      {item.Price}
                    </div>
                  </div>
                </Link>
              )
          )}
        </div>

      </main>
    </>
  );
}
