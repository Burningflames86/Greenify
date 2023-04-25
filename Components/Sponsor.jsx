import { Karla } from "next/font/google"

const karla = Karla({ subsets: ['latin'] })

export default function Sponsor() {
  return (
    <div className='relative w-[80%] h-[25rem] rounded-[26px] mt-3 mx-auto' style={{background: 'url(https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80), #606C38', backgroundBlendMode:'multiply', backgroundSize:'cover'}}>
      <div className={`${karla.className} absolute left-5 top-10 text-white tracking-widest text-3xl font-bold`}>TEAM TREES</div>
      <div className={`${karla.className} absolute left-5 top-[13.7rem] w-[40%] text-white leading-[20px] tracking-[0.04em] shadow-lg text-[13px]`}>Join the mission to plant millions of trees with Team Trees. Your donation can make a world of difference. Let's grow together!</div>
     <a target="_blank" href="https://teamtrees.org/">
     <button style={{boxShadow: '2px 8px 4px -5px #606C38'}} className={`${karla.className} top-[20rem] left-5  absolute w-[250px]  h-[63px] rounded-[35px] bg-[#FEFAE0] border-[6px] border-[#283618] text-[17px] leading-[20px] tracking-[0.04em] font-bold text-center flex justify-center donate items-center cursor-pointer`}>DONATE</button>
     </a>
    </div>
  )
}
