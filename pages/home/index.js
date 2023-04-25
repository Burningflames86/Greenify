import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "@/firebase.config";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Sell from "@/Components/Sell";
import NavBar from "@/Components/NavBar";
import Banner from "@/Components/Banner";
import NewBanner from "@/Components/NewBanner";
import { Lora } from "next/font/google";
import { Karla } from "next/font/google";
const lora = Lora({ subsets: ["latin"] });
const karla = Karla({ subsets: ["latin"] });
import Sponsor from "@/Components/Sponsor";
import Script from "next/script";
import Head from "next/head";

export default function Home() {
  const [items, setItems] = useState([]);
  const [premium, setPremium] = useState([]);
  const learn = useRef();

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
        (item) => item.Catos === "Shirts" || item.Catos === "Lowers"
      );
     

      
      setItems(fyShuffle(itemsArray.reverse()));

    };
    getdata();
  }, []);

  useEffect(() => {
    const getdata = async () => {
      const querySnapshot = await getDocs(query(collection(db, "Selling Objects"),where("Catos", "==", "PreShirts")));
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
        <title>Greenify-Home</title>
    </Head>
      <Script
        src="https://kit.fontawesome.com/989b026094.js"
        crossOrigin="anonymous"
      ></Script>
      {/* <Sell/> */}
      <main className={`${lora.className} bg-[#FEFAE0] pb-1`}>

        <NavBar cancat={true} upping={true}/>
        <Banner />
        <div
          className={`mt-80 mb-20 text-center ${karla.className} text-[25px] leading-[29px] tracking-[0.14em] font-extrabold text-[#606C38]`}
        >
          NEW ARRIVALS
        </div>
        <div className="flex items-center justify-between align-middle text-green-700 mx-24 gap-4">
          {items.map(
            (item, i) =>
             i <= 2 && (
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
        <NewBanner />
        <div
          className={`mt-80 mb-20 text-center ${karla.className} text-[25px] leading-[29px] tracking-[0.14em] font-extrabold text-[#606C38]`}
        >
          PREMIUM COLLECTION
        </div>
        <div className="flex items-center justify-between align-middle text-green-700 mx-24 gap-4">
          {premium.map(
            (item, i) =>
              i <= 2 && (
                <Link
                  href={`/${item.id}`}
                  key={item.id}
                  style={{
                    background: `url("${item.imgURL}"), transparent`,
                    backgroundBlendMode: "multiply",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  className="w-80 h-96 arrival relative rounded-[34px]"
                >
                  <div className="bottom-0 upping absolute text-sm text-white leading-[0.02em] tracking-[0.02em] px-4 bg-[#0C0B0B3D] rounded-b-[34px] py-8 w-[99.9%] flex justify-between">
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
        <div
          className={`flex gap-4 relative items-center justify-center tracking-[0.02em] leading-[25px] mx-24 font-semibold mt-6 ${karla.className}`}
        >
          <div  className="text-center tell w-96 h-60 py-[10%] text-3xl">
            <div onMouseEnter={() => learn.current.style.visibility = 'visible'} onMouseLeave={() => learn.current.style.visibility = 'hidden'} className="h-10"> LEARN MORE</div>
          </div>
          {premium[4] && 
                <Link
                  href={`/${premium[4].id}`}
                  key={premium[4].id}
                  style={{
                    background: `url(${premium[4].imgURL}), transparent`,
                    backgroundBlendMode: "multiply",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  className="w-80 h-96 arrival relative rounded-[34px]"
                >
                  <div className="bottom-0 absolute text-sm upping text-white leading-[0.02em] tracking-[0.02em] px-4 bg-[#0C0B0B3D] rounded-b-[34px] py-8 w-[99.9%] flex justify-between">
                    <div className={`${karla.className} upping`}>
                      {premium[4].Name}
                    </div>
                    <div className={`${karla.className} upping`}>
                      {premium[4].Price}
                    </div>
                  </div>
                </Link>
              }
          <Link href={`/catos/${"PreShirts_Men"}`} className="text-center w-96 h-60 py-[10%] text-3xl">
          <span className=" transition-all ease-in-out hover:text-lime-600">
            CHECK OUT MORE</span>
          </Link>
          <div ref={learn} className="learn absolute w-72 h-20 bg-transparent left-12 top-16 font-bold text-md text-center">Explore exclusive premium collection for elevated luxury. Handpicked products for ultimate shopping experience</div>
        </div>

        <div
          className={`mt-80 mb-20 text-center ${karla.className} text-[25px] leading-[29px] tracking-[0.14em] font-extrabold text-[#606C38]`}
        >
          MEN&apos;S
        </div>
        <div className="mx-64 flex justify-between">
        <Link href={`/catos/${"Shirts_Men"}`}>
          <div
            className="w-80 h-[28rem] rounded-[34px] relative arrival"
            style={{
              background: `url('https://media.discordapp.net/attachments/1000657685978546186/1099388603223769108/pexels-photo-11030407.png?width=330&height=586'), transparent`,
              backgroundSize: "100% 130%",
              backgroundBlendMode: "multiply",
              backgroundPosition: "center center",
            }}
          >
            <div className="bottom-0 absolute text-[20px] upping  text-white leading-[0.02em] tracking-[0.02em] px-4 bg-[#0C0B0B3D] rounded-b-[34px] py-8 w-[99.9%] flex justify-between">
              <div className={`${karla.className} w-full text-center`}>
                T-SHIRTS
              </div>
            </div>
          </div>
          </Link>
          <Link href={`/catos/${"Lowers_Men"}`}>
          <div
            className="w-80 h-[28rem] rounded-[34px] relative arrival"
            style={{
              background: `url('https://www.hackett.com/on/demandware.static/-/Library-Sites-hkt-content-global/default/dwa89a03ea/images/content-assets/the-hack/loungewear-collection/the-hack-loungewear-casual-trousers-01-mobile.jpg'), transparent`,
              backgroundSize: "100% 104%",
              backgroundBlendMode: "multiply",
              backgroundPosition: 'center center',
            }}
          >
            <div className="bottom-0 absolute text-[20px] upping  text-white leading-[0.02em] tracking-[0.02em] px-4 bg-[#0C0B0B3D] rounded-b-[34px] py-8 w-[99.9%] flex justify-between">
              <div className={`${karla.className} w-full text-center`}>
                LOWERS
              </div>
            </div>
          </div>
          </Link>
        </div>
        <div className="mx-64 flex justify-between mt-10">
        <Link href={`/catos/${"TShirts_Men"}`}>
          <div
            className="w-80 h-[28rem] rounded-[34px] relative arrival"
            style={{
              background: `url('https://images.unsplash.com/photo-1589234217365-08d3e0e5cf42?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'), transparent`,
              backgroundSize: "100% 100%",
              backgroundBlendMode: "multiply",
              backgroundPosition: 'center center',

            }}
          >
            <div className="bottom-0 absolute text-[20px] upping  text-white leading-[0.02em] tracking-[0.02em] px-4 bg-[#0C0B0B3D] rounded-b-[34px] py-8 w-[99.9%] flex justify-between">
              <div className={`${karla.className} w-full text-center`}>
                SHIRTS
              </div>
            </div>
          </div>
          </Link>
          <Link href={`/catos/${"Wallets_Men"}`}>
          <div
            className="w-80 h-[28rem] rounded-[34px] arrival relative"
            style={{
              background: `url('https://images.unsplash.com/photo-1678449484120-7bccd41043f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'), transparent`,
              backgroundSize: "100% 100%",
              backgroundBlendMode: "multiply",
              backgroundPosition: 'center center',

            }}
          >
            <div className="bottom-0 absolute text-[20px]  upping text-white leading-[0.02em] tracking-[0.02em] px-4 bg-[#0C0B0B3D] rounded-b-[34px] py-8 w-[99.9%] flex justify-between">
              <div className={`${karla.className} w-full text-center`}>
                WALLETS
              </div>
            </div>
          </div>
          </Link>
        </div>

        <div
          className={`mt-80 mb-20 text-center ${karla.className} text-[25px] leading-[29px] tracking-[0.14em] font-extrabold text-[#606C38]`}
        >
          WOMEN&apos;S
        </div>
        <div className="mx-64 flex justify-between">
        <Link href={`/catos/${"Shirts_Women"}`}>
          <div
            className="w-80 h-[28rem] rounded-[34px] relative arrival"
            style={{
              background: `url('https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d29tYW4lMjB0JTIwc2hpcnR8ZW58MHx8MHx8&w=1000&q=80'), transparent`,
              backgroundSize: "100% 100%",
              backgroundBlendMode: "multiply",
              backgroundPosition: 'center center',

            }}
          >
            <div className="bottom-0 absolute text-[20px]  text-white upping leading-[0.02em] tracking-[0.02em] px-4 bg-[#0C0B0B3D] rounded-b-[34px] py-8 w-[99.9%] flex justify-between">
              <div className={`${karla.className} w-full text-center`}>
                T-SHIRTS
              </div>
            </div>
          </div>
          </Link>
          <Link href={`/catos/${"Lowers_Women"}`}>
          <div
            className="w-80 h-[28rem] rounded-[34px] relative arrival"
            style={{
              background: `url('https://img.freepik.com/free-photo/young-woman-wearing-pajamas-sleep-mask_273609-41653.jpg'), transparent`,
              backgroundSize: "200% 100%",
              backgroundBlendMode: "multiply",
              backgroundPosition: 'center center',

            }}
          >
            <div className="bottom-0 absolute text-[20px]  text-white upping leading-[0.02em] tracking-[0.02em] px-4 bg-[#0C0B0B3D] rounded-b-[34px] py-8 w-[99.9%] flex justify-between">
              <div className={`${karla.className} w-full text-center`}>
                LOWERS
              </div>
            </div>
          </div>
          </Link>
        </div>
        <div className="mx-64 flex justify-between mt-10">
        <Link href={`/catos/${"TShirts_Women"}`}>
          <div
            className="w-80 h-[28rem] rounded-[34px] relative arrival"
            style={{
              background: `url('https://img.freepik.com/free-photo/woman-white-shirt-pants-with-design-space-casual-wear-fashion-f_53876-125227.jpg'), transparent`,
              backgroundSize: "100% 100%",
              backgroundBlendMode: "multiply",
              backgroundPosition: 'center center',

            }}
          >
            <div className="bottom-0 absolute text-[20px]  text-white upping leading-[0.02em] tracking-[0.02em] px-4 bg-[#0C0B0B3D] rounded-b-[34px] py-8 w-[99.9%] flex justify-between">
              <div className={`${karla.className} w-full text-center`}>
                SHIRTS
              </div>
            </div>
          </div>
          </Link>
          <Link href={`/catos/${"Purses_Women"}`}>
          <div
            className="w-80 h-[28rem] rounded-[34px] relative arrival"
            style={{
              background: `url('https://media.istockphoto.com/id/1133140907/photo/show-the-city-what-youre-made-of.jpg?s=612x612&w=0&k=20&c=fyc1M7kc4EZZ6Gr4jwrijGxbym8ZfFdkSgAoU4abYG4='), transparent`,
              backgroundSize: "100% 100%",
              backgroundBlendMode: "multiply",
              backgroundPosition: 'center center',

            }}
          >
            <div className="bottom-0 absolute text-[20px]  text-white upping leading-[0.02em] tracking-[0.02em] px-4 bg-[#0C0B0B3D] rounded-b-[34px] py-8 w-[99.9%] flex justify-between">
              <div className={`${karla.className} w-full text-center`}>
                PURSES
              </div>
            </div>
          </div>
          </Link>
        </div>
        <div
          className={`mt-80 mb-20 text-center ${karla.className} text-[25px] leading-[29px] tracking-[0.14em] font-extrabold text-black`}
        >
          TODAY&apos;S SPONSOR
        </div>

        <Sponsor />
      </main>
    </>
  );
}
