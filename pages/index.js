import Head from "next/head";


import { useAuth } from "../AuthContext";
import { useRouter } from "next/router";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.config";

import { Syne } from "next/font/google";
import { Poppins } from "next/font/google";
import { Oswald } from "next/font/google";

import { useRef, useEffect } from "react";
import Script from "next/script";

const syne = Syne({ subsets: ["latin"] });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});
const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Home() {
  const { signInWithGoogle } = useAuth();
  const router = useRouter();
  const { currentUser } = useAuth();

  const t1 = useRef();
  const t2 = useRef();
  const t3 = useRef();

  const points = useRef();
  const desc = useRef();

  const our = useRef();

  const rotor = useRef();

  const taker = useRef();

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      await signInWithGoogle();
      router.push("/home");
      const userRef = doc(db, "Users", currentUser.uid);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        console.log("User data already exists in Firestore");
      } else {
        console.log("Adding user data to Firestore");
        await setDoc(userRef, { points: 500, sold: [] }, { merge: true });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const changeHandler = (e, t) => {
    const hachild = document.querySelectorAll(".hachild");

    hachild.forEach((h) => {
      h.style.color = "#DDA15E";
    });

    var rect =
      t.current.getBoundingClientRect().top -
      rotor.current.getBoundingClientRect().top;

    if (t.current.classList[0] == "uniq") {
      console.log("unisq");
      rotor.current.scroll({
        top: rect + 1000,
        left: 0,
        behavior: "smooth",
      });
    } else {
      rotor.current.scroll({
        top: rect,
        left: 0,
        behavior: "smooth",
      });
    }
    e.target.style.color = "#BC6C25";
    console.log(e.target.style.color);
  };

  const hoverHandler = (e) => {
    points.current.style.color = "#BC6C25";
    desc.current.style.color = "#BC6C25";

    console.log(e.target.classList[0]);
    if (e.target.classList[0] == "sheep") {
      points.current.textContent = "1. Choosing the right material";
      desc.current.textContent =
        "We care about the world so we select fabrics that are eco-friendly and have a low or no environmental impact.";
    } else if (e.target.classList[0] == "pen") {
      points.current.textContent = "2.Pattern Making";
      desc.current.textContent =
        "We use pattern-making techniques that minimize fabric waste and plan the design of the garment to ensure it can be produced efficiently.";
    } else if (e.target.classList[0] == "sew") {
      points.current.textContent = "3. Sewing";
      desc.current.textContent =
        "We use energy-efficient machinery and techniques to sew the garment together, we even use recycled thread or thread made from eco-friendly materials.";
    } else if (e.target.classList[0] == "dye") {
      points.current.textContent = "4. Using the best dye";
      desc.current.textContent =
        "We use natural dyes made from plants and other natural sources instead of synthetic dyes.";
    } else if (e.target.classList[0] == "steam") {
      points.current.textContent = "5. Steaming";
      desc.current.textContent =
        "We choose steamers that are energy-efficient and use less water, reducing carbon footprints";
    } else if (e.target.classList[0] == "shirt") {
      points.current.textContent = "6.Our Shirt";
      desc.current.textContent =
        "This is how we make our eco friendly clothes. Reducing the pollution, cost and waste.";
      points.current.style.color = "rgb(21 128 61)";
      desc.current.style.color = "rgb(21 128 61)";
    }
  };

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (taker.current) {
        taker.current.scrollTop += 510;
        console.log(taker.current.scrollTop + 510);
      }
      if (taker.current && taker.current.scrollTop + 510 > 1300) {
        taker.current.scrollTop -= 1000;
      }
    }, 2300);

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <>
      <Head>
        <title>Greenify</title>
      </Head>
      <Script
        src="https://kit.fontawesome.com/989b026094.js"
        crossOrigin="anonymous"
      ></Script>
      <main className={`bg-[#FEFAE0]  text-[#DDA15E] ${syne.className}`}>
        <div className="w-full h-[100vh] bg-red-900"></div>
        <div className="mt-10 mx-10 text-center ">
          {!currentUser && (
            <button
              className="rounded-full bg-lime-400 border-[1px] border-lime-400 text-black transition-all hover:bg-white hover:border-[20px] hover:text-lg hover:scale-125 font-bold hover:text-black w-32 h-32"
              onClick={loginHandler}
            >
              Login
            </button>
          )}
          {currentUser && (
            <button
              className="rounded-full bg-lime-400 border-[1px] border-lime-400 text-black transition-all hover:bg-white hover:border-[20px] hover:text-lg hover:scale-125 font-bold hover:text-black w-32 h-32"
              onClick={() => {
                router.push("/home");
              }}
            >
              Home
            </button>
          )}
        </div>

        <div className="flex items-center flex-row-reverse justify-end mt-10 mx-20 gap-10">
          <div className="relative rounded-lg">
            <img
              className="rounded-lg border-[5px] z-10 border-[#BC6C25]"
              src="https://i.pinimg.com/originals/94/9c/f7/949cf7a911637b95dc2eacdaf26403f1.jpg"
              alt=""
            />
            <img
              className="rounded-lg border-[5px] z-10 border-[#BC6C25] absolute top-52 h-[26rem] w-[17rem] left-44"
              src="https://i.pinimg.com/originals/79/60/85/79608551d1927d8a8f2d56897ccab18b.jpg"
              alt=""
            />
          </div>
          <div className="w-[95rem] text-5xl leading-[5.9rem]">
            <p className="">
              Revamp your wardrobe{" "}
              <span className="px-2 rounded-full text-black py-1 bg-[#BC6C25] font-bold">
                sustainably
              </span>{" "}
              with our{" "}
              <span className="px-2 rounded-full text-black py-1 bg-[#BC6C25] font-bold">
                eco-conscious
              </span>{" "}
              brand,{" "}
              <span className="px-2 rounded-full text-black py-1 bg-[#BC6C25] font-bold">
                {" "}
                recycling{" "}
              </span>{" "}
              fashion for a better tomorrow.
            </p>
          </div>
        </div>

        <div
          className={`flex justify-between ${poppins.className} gap-20 mx-24 rounded-md px-10  mt-48`}
        >
          <div className=" flex flex-col gap-5">
            <div
              onClick={(e) => changeHandler(e, t1)}
              className="text-6xl hachild  font-bold cursor-pointer"
            >
              Vision
            </div>
            <div
              onClick={(e) => changeHandler(e, t2)}
              className="text-6xl hachild font-bold cursor-pointer"
            >
              Mission
            </div>
            <div
              onClick={(e) => changeHandler(e, t3)}
              className=" text-6xl hachild font-bold cursor-pointer"
            >
              Values
            </div>
          </div>
          <div
            ref={rotor}
            className="overflow-scroll pointer-events-none rotor relative"
          >
            <div
              ref={t1}
              style={{ wordSpacing: "20px" }}
              className="text-5xl text-black leading-[4.6rem] font-semibold tracking-widest"
            >
              Creating a circular economy while promoting fairness,
              affordability, and sustainability.
            </div>
            <div
              ref={t2}
              style={{ wordSpacing: "20px" }}
              className="text-5xl mt-36 absolute text-black leading-[4.6rem] font-semibold tracking-widest"
            >
              Revolutionizing fashion by recycling old clothes into sustainable,
              stylish garments.
            </div>
            <div
              ref={t3}
              style={{ wordSpacing: "20px" }}
              className="uniq text-5xl mt-[40rem] absolute text-black leading-[4.6rem] font-semibold tracking-widest"
            >
              Fairness, sustainability, and affordability - for people and the
              planet.
            </div>
          </div>
        </div>

        <div className=" bg-lime-200 text-amber-700 rounded-full mt-28 pt-0 p-20 ">
          <h1
            style={{ wordSpacing: "20px" }}
            className={`mt-72 ${poppins.className} ${oswald.className} text-5xl pt-44 pb-10 font-bold  text-[#BC6C25] tracking-[0.3em] text-center mb-10`}
          >
            WELCOME TO GREENIFY!
          </h1>
          <div className="flex gap-16 text-center flex-row-reverse">
            <img
              className="rounded-lg  h-[30rem] border-[5px]  border-[#BC6C25] "
              src="https://i.pinimg.com/originals/43/88/cc/4388cc4006d275df8a4e5fce258082d8.jpg"
              alt=""
            />
            <div
              style={{ wordSpacing: "14px" }}
              className=" leading-[3rem] tracking-wider text-[1.5rem]"
            >
              We are the perfect choice for eco-conscious shoppers who want to
              make a positive impact on the environment without sacrificing
              quality or affordability. Our sustainable brand offers a wide
              range of eco-friendly products that are made with the highest
              quality materials and designed to last. By choosing us, you can
              feel good about your purchase and help support a more sustainable
              future.
            </div>
          </div>
          <div className="mt-10 mx-10 text-center ">
            {!currentUser && (
              <button
                className="rounded-full bg-lime-400 border-[1px] border-lime-400 text-black transition-all hover:bg-white hover:border-[20px] hover:text-lg hover:scale-125 font-bold hover:text-black w-32 h-32"
                onClick={loginHandler}
              >
                <div>Shop</div> Now
              </button>
            )}
            {currentUser && (
              <button
                className="rounded-full bg-lime-400 border-[1px] border-lime-400 text-black transition-all hover:bg-white hover:border-[20px] hover:text-lg hover:scale-125 font-bold hover:text-black w-32 h-32"
                onClick={() => {
                  router.push("/home");
                }}
              >
                <div>Shop</div> Now
              </button>
            )}
          </div>
        </div>
        <h1
          style={{ wordSpacing: "20px" }}
          className={`mt-72 text-5xl text-[#BC6C25] font-bold tracking-widest text-center mb-10 ${poppins.className}`}
        >
          How we make{" "}
          <span
            className="transition-all ease-in-out duration-300 text-black"
            ref={our}
          >
            OUR
          </span>{" "}
          clothes
        </h1>
        <div className="relative">
          <div className="flex mx-20 justify-between items-center">
            <div>
              <img
                onMouseEnter={(e) => hoverHandler(e)}
                src="https://cdn-icons-png.flaticon.com/512/66/66722.png"
                className="sheep hover:shadow-2xl hover:bg-[#BC6C25] border-[5px] bg-white border-black rounded-full w-44 h-44 p-10"
              />
            </div>
            <i class="px-3 text-[5rem] text-black fa-solid fa-arrow-right"></i>
            <div>
              <img
                onMouseEnter={(e) => hoverHandler(e)}
                src="https://cdn.onlinewebfonts.com/svg/img_545915.png"
                className="pen hover:shadow-2xl hover:bg-[#BC6C25] border-[5px] bg-white border-black rounded-full w-44 h-44 p-10"
              />
            </div>
            <i class="px-3 text-[5rem] text-black fa-solid fa-arrow-right"></i>
            <div>
              <img
                onMouseEnter={(e) => hoverHandler(e)}
                src="https://img.freepik.com/free-icon/sewing-machine_318-914678.jpg"
                className="sew hover:shadow-2xl hover:bg-[#BC6C25] border-[5px] bg-white border-black rounded-full w-44 h-44 p-6"
              />
            </div>
          </div>
          <div className="mx-32 mt-4 text-right">
            <i class="text-black rotate-90 px-3 text-[5rem] fa-solid fa-arrow-right"></i>
          </div>
          <div className="absolute top-[15.5rem] font-semibold text-[#BC6C25] text-xl text-center left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <h1 ref={points} className="text-2xl font-bold text-[#BC6C25]"></h1>
            <p ref={desc} className="mt-2"></p>
          </div>
        </div>
        <div className="flex mt-16 flex-row-reverse mx-20 justify-between items-center">
          <div>
            <img
              onMouseEnter={(e) => hoverHandler(e)}
              src="https://cdn-icons-png.flaticon.com/512/4304/4304156.png"
              className="dye hover:shadow-2xl hover:bg-[#BC6C25] border-[5px] bg-white border-black rounded-full w-44 h-44 p-10"
            />
          </div>
          <i class="text-black -rotate-180 px-3 text-7xl fa-solid fa-arrow-right"></i>
          <div>
            <img
              onMouseEnter={(e) => hoverHandler(e)}
              src="https://www.freeiconspng.com/uploads/heating-icon-4.png"
              className="steam hover:shadow-2xl hover:bg-[#BC6C25] border-[5px] bg-white border-black rounded-full w-44 h-44 p-10"
            />
          </div>
          <i class="text-black -rotate-180 px-3 text-7xl fa-solid fa-arrow-right"></i>
          <div>
            <img
              onMouseEnter={(e) => hoverHandler(e)}
              src="https://cdn-icons-png.flaticon.com/512/17/17311.png"
              className="shirt shadow-2xl border-black hover:bg-green-700 border-[5px] bg-white rounded-full w-44 h-44 p-10"
            />
          </div>
        </div>
        <div className="mt-52 text-center mx-[18rem]">
          <h1 className="text-5xl font-bold text-[#15803D] tracking-wider">
            Greenify Merch{" "}
          </h1>
          <h4 className="text-right tracking-wide text-black text-xl">
            -show them you care
          </h4>
        </div>
        <div className="flex justify-center text-2xl text-center tracking-wider text-[#BC6C25] mx-20 gap-4 mt-10">
          <div className="flex flex-col justify-between py-14">
            <div>
              {" "}
              made by reducing 16% <br />
              of the carbon emissions
            </div>
            <div>used plant based dyes</div>
          </div>
          <div className="h-[38rem]">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/greenify-dc70f.appspot.com/o/heather-ford-5gkYsrH_ebY-unsplash-removebg-preview.png?alt=media&token=c2577497-518c-4890-80f4-2bd6903da727"
              alt=""
              className="w-full h-full mix-blend-darken"
            />
          </div>
          <div className="flex flex-col justify-between py-14">
            <div> saved water upto 50%</div>
            <div>
              made with love and <br /> care of mother earth
            </div>
          </div>
        </div>
        <h1 className="mt-40 text-center text-6xl font-bold">
          Greenify Tokens
        </h1>
        <div
          className={`flex justify-between ${poppins.className} gap-20 mt-16 items-center mx-20 rounded-md px-10  `}
        >
          <div className="  rounded-full">
            <img
              className="w-[90rem] h-80 rounded-full"
              src="https://firebasestorage.googleapis.com/v0/b/greenify-dc70f.appspot.com/o/coin.png?alt=media&token=75d68cb1-314e-4cac-a462-369f306dce82"
              alt=""
            />
          </div>
          <div
            ref={taker}
            className="transition-all scroll-smooth overflow-scroll pointer-events-none rotor relative"
          >
            <div
              style={{ wordSpacing: "10px" }}
              className="text-3xl text-black leading-[4.6rem] font-semibold tracking-widest"
            >
              Our company deals in greenify tokens. You can exchange your money
              for our <span className="text-green-700"> GREENIFY TOKENS </span>{" "}
              to buy sustainable and affordable clothes.
            </div>
            <div
              style={{ wordSpacing: "10px" }}
              className="text-3xl mt-36 absolute text-black leading-[4.6rem] font-semibold tracking-widest"
            >
              We care about your old used clothes! Bring in your gentaly used
              items, and get greenify tokens in return
            </div>
            <div
              style={{ wordSpacing: "10px" }}
              className="uniq text-3xl mt-[40rem] absolute text-black leading-[4.6rem] font-semibold tracking-widest"
            >
              We deal in greenify tokens. Keep a track of your tokens in your
              profile.
              <p className="text-green-700">Get your greenify tokens today! </p>
            </div>
          </div>
        </div>

        <h1
          style={{ wordSpacing: "12px" }}
          className={`mt-40 ${poppins.className} text-center text-5xl tracking-widest text-[#BC6C25] font-bold rounded-t-lg pt-3 mx-10`}
        >
          THEY SAID...
        </h1>
        <div className="flex  px-10 rounded-b-lg pb-10 justify-between mx-10">
          <div className="w-80 mt-10  max-w-sm bg-amber-900  rounded-lg  ">
            <div className="flex justify-end px-4 pt-4"></div>
            <div className="flex flex-col items-center pb-10">
              <img
                className="w-24 h-24 mb-3 rounded-full shadow-lg"
                src="https://resources.tidal.com/images/58cb2c48/ea88/4ffe/9847/822e0e4017e4/750x750.jpg"
                alt="Bonnie image"
              />
              <h5 className="mb-1 text-2xl font-semibold text-slate-500">
                2PAC
              </h5>
              <p className="text-center text-md px-3 pt-4 text-white">
                Yo, listen up, let me tell you 'bout Greenify <br />
                <span className="">
                  {" "}
                  An ecommerce site that's got me feeling fly
                </span>
                <br />
                Selling eco-friendly clothes that make me look good
                <br />
                And I know I'm doing my part for the neighborhood
                <br />
              </p>
            </div>
          </div>
          <div className="w-80 mt-10  max-w-sm bg-gray-600  rounded-lg shadow-lg ">
            <div className="flex justify-end px-4 pt-4"></div>
            <div className="flex flex-col items-center pb-10">
              <img
                className="w-24 h-24 mb-3 rounded-full shadow-lg"
                src="https://compote.slate.com/images/d9a99820-5841-4b90-bc20-cb3b86af7f65.jpg"
                alt="Bonnie image"
              />
              <h5 className="mb-1 text-2xl font-semibold text-black">
                Kendrick Lamar
              </h5>
              <p className="text-center text-md px-3 pt-4 text-white">
                I used to shop at those big-name stores <br />
                Buying clothes made with chemicals galore
                <br />
                But then I found Greenify, and man, was I stoked
                <br />
                Their clothes are sustainable, and that ain't no joke
                <br />
              </p>
            </div>
          </div>
          <div className="w-80 mt-10  max-w-sm bg-orange-700  rounded-lg shadow-lg ">
            <div className="flex justify-end px-4 pt-4"></div>
            <div className="flex flex-col items-center pb-10">
              <img
                className="w-24 h-24 mb-3 rounded-full shadow-lg"
                src="https://media.allure.com/photos/6425c66408fd6fd7e6b7c91e/1:1/w_1914,h_1914,c_limit/ice%20spice%20iheart%20music%20awards%202023.jpg"
                alt="Bonnie image"
              />
              <h5 className="mb-1 text-2xl font-semibold text-red-100">
                Ice Spice
              </h5>
              <p className="text-center px-4 pt-4 text-white">
              From bamboo tees to organic cotton pants <br/>
Their selection's got me doing a happy dance<br/>
I can look good and feel good at the same time<br/>
And I know I'm making a difference with every dime<br/>
              </p>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-amber-700 opacity-80 text-black font-sans text-center">
        <h1 className="text-4xl font-semibold leading-[3rem] text-[2.1rem]">Greenify</h1>
        <p className="max-w-[500px] mt-10 mx-auto">Greenify is a website where sustainability meets fashion.
         Every cloth is either recycled or made with eco friendly methods while reducing carbon footprints. 
         </p>
         <p className="my-3">Join our #GOGREEN movement </p>
         <ul class="socials pb-6">
   <li><a href="https://www.instagram.com/kritikaghoshh/" target="_blank"><i class="text-black fa fa-instagram"></i></a></li>
   <li><a href="https://twitter.com/KRITIKA71652416" target="_blank"><i class="text-black fa fa-twitter"></i></a></li>
   <li><a href="https://www.youtube.com/channel/UCxaTdy81D-w9QS4dkl6IEIA" target="_blank"><i class="text-black fa fa-youtube"></i></a></li>
</ul>
      </footer>
    </>
  );
}
