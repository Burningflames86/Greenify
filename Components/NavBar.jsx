import { useAuth } from "../AuthContext";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  doc,
  getDoc,
  getDocs,
  query,
  collection,
  orderBy,
} from "firebase/firestore";
import { db } from "@/firebase.config";

import { Karla } from "next/font/google";

const karla = Karla({ subsets: ["latin"] });


export default function NavBar(props) {
  const { currentUser } = useAuth();

  const [points, setpoints] = useState();
  const [items, setItems] = useState();

  const [requiredItems, setRequiredItems] = useState();

  useEffect(() => {
    const unsub = async () => {
      if (!currentUser) {
        return;
      }
      const id = currentUser?.uid;
      const docRef = doc(db, "Users", id);
      const docSnap = await getDoc(docRef);
      setpoints(docSnap.data());
    };
    return unsub;
  }, [currentUser]);

  useEffect(() => {
    const unsub = async () => {
      const q = query(collection(db, "Selling Objects"), orderBy("createdAt"));
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
      setItems(itemsArray);
    };

    return unsub;
  }, [db]);

  function handleScroll() {
    window.scroll({
      top: 3300,
      left: 0,
      behavior: "smooth",
    });
  }

  const handleCategoryChange = (e) => {
    const searchString = e.target.value.toLowerCase();
    if(searchString.length >= 3){
    setRequiredItems(
      items.filter((item) => item.Name.toLowerCase().includes(searchString))
    );}else{
      setRequiredItems([]);
    }
    console.log(requiredItems);
  };

  return (
    <>
      <div className="flex text-[#283618] justify-between align-middle items-center mx-20 pt-20 pb-4">
        {/* <div className="burger w-7 h-[0.1rem] relative bg-[#283618]"></div> */}
        <Link
          href={"/home"}
          className=" font-bold gap-1 items-end leading-[37px] flex text-[29px] tracking-[0.19em]"
        >
          <img
            className="h-12 w-12"
            src="https://firebasestorage.googleapis.com/v0/b/greenify-dc70f.appspot.com/o/logo.png?alt=media&token=1f1427d8-430f-4e72-9e81-ca08dd28de5b"
          />{" "}
          <span>reenify</span>
        </Link>
        <div className="w-[500px] h-[56px] border-[5px] border-[#BC6C25] rounded-[31px] outline-none resize-none py-2.5 px-5 overflow-hidden text-[20px] leading-[27px] text-white bg-[#DDA15E]">
          <textarea
            placeholder="Search"
            className={`w-[500px] h-[56px] bg-[#DDA15E] outline-none placeholder-white ${karla.className} `}
            onChange={handleCategoryChange}
          />
          {requiredItems && requiredItems.length>1 && (
            <div className={`absolute top-[${props.upping ? "9" : "4"}rem]  left-[${props.upping ? "23" : "29"}rem] z-10 text-sm h-[19rem] overflow-y-scroll ${karla.className} font-semibold search`}>
             
              {requiredItems.map(
                (item, i) =>
                   (
                    <Link href={`/${item.id}`} key={item.id}>
                    <div className={`bg-white border-b-2  ${i === 0 ? "rounded-t-xl" : ""} border-black items-center gap-3 px-[2rem] flex text-black py-5`}>
                    <div className="w-16 h-16 "><img src={item.imgURL} className="w-full h-full"/></div>
                    <div>{item.Name}</div>
                    </div>
                    </Link>
                  )
              )}
              
            </div>
          )}
        </div>
        {props.cancat && (
          <div
            className="text-[16px] leading-[20px] cursor-pointer hover:text-[#112101]"
            onClick={handleScroll}
          >
            Categories
          </div>
        )}
        {props.cancoin && (
          <div
            className="text-[16px] leading-[20px] hover:text-[#112101]"
            onClick={handleScroll}
          >
            {points && (
              <div className="flex text-lime-900 items-center gap-1">
                {" "}
                <img
                  className="h-6 w-6 rounded-full"
                  src="https://firebasestorage.googleapis.com/v0/b/greenify-dc70f.appspot.com/o/coin.png?alt=media&token=75d68cb1-314e-4cac-a462-369f306dce82"
                />{" "}
                {points.points}{" "}
              </div>
            )}
          </div>
        )}
        <Link
          href={"/"}
          className="text-[16px] leading-[20px] hover:text-[#112101]"
        >
          About
        </Link>
        {currentUser && (
          <Link href={`/dashboard/${currentUser.uid}`}>
            {!currentUser && (
              <i className="fa-solid fa-user hover:text-[#112101]"></i>
            )}{" "}
            {currentUser && (
              <img
                src={currentUser.photoURL}
                width="50"
                height="50"
                referrerPolicy="no-referrer"
              />
            )}{" "}
          </Link>
        )}
      </div>
    </>
  );
}
