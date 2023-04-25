import { collection, query, getDocs, orderBy, where } from "firebase/firestore";
import { db } from "@/firebase.config";
import { useEffect, useState } from "react";

import Link from "next/link";
import Head from "next/head";

import NavBar from "@/Components/NavBar";
import Script from "next/script";

import { Karla } from "next/font/google";
import { Lora } from "next/font/google";

const karla = Karla({ subsets: ["latin"] });
const lora = Lora({ subsets: ["latin"] });

export default function NewArrivals() {
  const [items, setItems] = useState();
  const [women, setWomen] = useState();

  useEffect(() => {
    const unsub = async () => {
      const q = query(collection(db, "Selling Objects"), where("Gender", "!=", "Merch") );
      const querySnapshot = await getDocs(q);
      const itemsArray = [];
      querySnapshot.forEach((doc) => {
        itemsArray.push({
          id: doc.id,
          Name: doc.data().Name,
          Price: doc.data().Price,
          imgURL: doc.data().imgURL,
          Catos: doc.data().Catos,
          Gender: doc.data().Gender,
        });
      });
      setItems(fyShuffle(itemsArray.reverse()));
    };

    return unsub;
  }, [db]);


  useEffect(() => {
    const unsub = async () => {
      const q = query(
        collection(db, "Selling Objects"),
        where("Gender", "==", "Women")
      );
      const querySnapshot = await getDocs(q);
      const itemsArray = [];
      querySnapshot.forEach((doc) => {
        itemsArray.push({
          id: doc.id,
          Name: doc.data().Name,
          Price: doc.data().Price,
          imgURL: doc.data().imgURL,
          Gender: doc.data().Gender
        });
      });
      console.log(itemsArray);
      setWomen(itemsArray);
    };

    return unsub;
  }, [db]);
  function fyShuffle(arr) {
    let i = arr.length;
    while (--i > 0) {
      let randIndex = Math.floor(Math.random() * (i + 1));
      [arr[randIndex], arr[i]] = [arr[i], arr[randIndex]];
    }
    
    arr = arr.filter(
      (item) => item.Gender !== "Women"
    );
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

      <main className=" bg-[#FEFAE0] pb-10">
        <div className={`${lora.className} -mt-10`}>
          <NavBar cancoin={true} />
        </div>
        <div className=" arrivedcontainer text-green-700 mx-24 mt-12">
          {items &&
            items.map(
              (item) =>
                item.Catos != "PreShirts" && (
                  <Link
                    key={item.id}
                    href={`/${item.id}`}
                    style={{
                      background: `url("${item.imgURL}")`,
                      backgroundColor: "transparent",
                      backgroundBlendMode: "multiply",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    className="w-80 h-96  relative arrival rounded-[34px]"
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
        <div className=" arrivedcontainer text-green-700 mx-24 mt-12">
          {women &&
            women.map(
              (item) =>
                item.Catos != "PreShirts" && (
                  <Link
                    key={item.id}
                    href={`/${item.id}`}
                    style={{
                      background: `url("${item.imgURL}")`,
                      backgroundColor: "transparent",
                      backgroundBlendMode: "multiply",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    className="w-80 h-96  relative arrival rounded-[34px]"
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
