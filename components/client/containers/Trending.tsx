import Image from 'next/image'
import React from 'react'
import TrCard from '../trending/TrCard'
import { JetBrains_Mono } from "next/font/google";
import NavSlide from '../banner/NavSlide';

const jetBrains_Mono = JetBrains_Mono({ weight: ['700'], subsets: ['latin'] });

export default function Trending() {
  return (
    <div className='flex justify-cente m-10'>
      <div className='w-[100%] max-w-[1500px] flex justify-between gap-20  bg-white mx-auto p-5 rounded-md'>
        <div className='max-w-[700px] w-full p-3 flex flex-col gap-5'>
          <header>
            <nav className='flex items-center gap-4'>
              <p>Nouveaux collections</p>
              <p className='opacity-50'>Meilleurs Ventes</p>
            </nav>
          </header>

          <h1 className={`${jetBrains_Mono.className} text-3xl max-w-[600px] leading-[50px] `} >VISITEZ NOS DERNIERRES COLLECTIONS</h1>
          <p className='max-w-[500px] opacity-70'>
            Le lorem ipsum est, en imprimerie, une suite de mots sans
            signification utilisée à titre provisoire pour
            calibrer une mise en page, le texte définitif venant re
          </p>

          <div className='flex gap-4 items-end'>
            <Image
              className='rounded-md w-[140px] h-[140px] '
              src="/trending/1.jpeg" width={100} height={100} alt="" />
            <Image
              className='rounded-md w-[140px] h-[120px] '
              src="/trending/2.jpg" width={100} height={100} alt="" />
          </div>


          <div className='w-full flex justify-between items-center relative mt-5'>
            <div className='flex items-center gap-2'>
              <span className='w-[10px] h-[10px] rounded-full bg-black'></span>
              <span className='w-[10px] h-[10px] rounded-full bg-black'></span>
              <span className='w-[10px] h-[10px] rounded-full bg-black'></span>
            </div>
            <NavSlide style='absolute right-[0] gap-2 z-[1]'/>
          </div>
        </div>

        <div className=' p-5 overflow-x-scroll trending-slide'>
          <div className='flex gap-4'>
            <TrCard src='/trending/3.png' />
            <TrCard src='/trending/4.png'/>
            <TrCard src='/trending/3.png' />
          </div>
        </div>
      </div>
    </div>
  )
}
