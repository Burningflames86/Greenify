import { Karla } from "next/font/google"

import Link from "next/link"

const karla = Karla({ subsets: ['latin'] })

export default function NewBanner() {
  return (
    <div className='banner2 relative rounded-[26px] mt-8 mx-auto'>
      <div className={`${karla.className} absolute left-5 bottom-28 text-white leading-[29px] text-[25px] font-semibold bannerhead`}>NEW ARRIVALS</div>
      <div className={`${karla.className} absolute left-5 top-[10rem] w-[60%]  opacity-80 text-white leading-[20px] tracking-[0.04em] text-[17px] bannertext`}>Check out our latest arrivals! Discover trendy products and stay ahead of the fashion curve.</div>
      <Link href='/new_arrivals' className="w-[100px] h-[100px] absolute right-10 top-[7rem] rounded-full bg-black text-white flex justify-center items-center bannerarrow"><i className="fa-solid fa-arrow-right text-4xl"></i></Link>

    </div>
  )
}
