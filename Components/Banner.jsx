import { Karla } from "next/font/google"

const karla = Karla({ subsets: ['latin'] })
import Link from "next/link"

export default function Banner() {
  return (
    <div className='banner relative rounded-[26px] mt-40 mx-auto'>
      <div className={`${karla.className} absolute left-5 bottom-28 text-white tracking-widest text-[25px] font-semibold bannerhead`}>THE MERCH</div>
      <div className={`${karla.className} absolute left-5 top-[18.7rem] w-[40%]  text-white leading-[20px] tracking-[0.04em] text-[13px] bannertext`}>Shop our monthly eco-friendly merchandise collection and wear your support for a greener future</div>
      <Link href={`/${"7Xv7RMiLOos9II8nvYEh"}`} className="w-[100px] h-[100px] absolute right-10 top-[17rem] rounded-full bg-black text-white flex justify-center items-center bannerarrow"><i className="fa-solid fa-arrow-right text-4xl"></i></Link>
    </div>
  )
}
