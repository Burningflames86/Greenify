import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "@/firebase.config";
import { useEffect, useState } from "react";

import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";

import NavBar from "@/Components/NavBar";
import Script from "next/script";

import { Karla } from "next/font/google";
import { Lora } from "next/font/google";

const karla = Karla({ subsets: ["latin"] });
const lora = Lora({ subsets: ["latin"] });

export default function Catos() {
  const [items, setItems] = useState();
  const router = useRouter();
  const cats = router.query;

  // useEffect(() => {
  //   const unsub = async () => {
  //     const q = query(
  //       collection(db, "Selling Objects"),
  //       where("Catos", "==", cats.catos.split("_")[0])
  //     );
  //     const querySnapshot = await getDocs(q);
  //     const itemsArray = [];
  //     querySnapshot.forEach((doc) => {
  //       itemsArray.push({
  //         id: doc.id,
  //         Name: doc.data().Name,
  //         Price: doc.data().Price,
  //         imgURL: doc.data().imgURL,
  //         Gender: doc.data().Gender
  //       });
  //     });
  //     setItems(itemsArray);
  //   };

  //   return unsub;
  // }, [cats.catos]);

  useEffect(() => {
    if (typeof router.query !== "undefined") {
      const { catos } = router.query;
      const q = query(
        collection(db, "Selling Objects"),
        where("Catos", "==", catos.split("_")[0])
      );
      const fetchItems = async () => {
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
        setItems(itemsArray);
      };
      fetchItems();
    }
  }, [router.query]);

  return (
    <>
      <Head>
        <title>Greenify </title>
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
                item.Gender == cats.catos.split("_")[1] && (
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
