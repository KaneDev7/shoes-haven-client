import React from 'react'
import { Saira_Extra_Condensed } from "next/font/google";
import Image from 'next/image';

const saira_Extra_Condensed = Saira_Extra_Condensed({ weight: ['800'], subsets: ['latin'] });

export default function BannerHome() {
  return (
    <section className='w-full h-[80vh] banner relative'>
      <div className='relative h-full globalMaxWidth'>
        <div className={`w-full absolute top-[80px] left-[50%] translate-x-[-50%] z-[2]  ${saira_Extra_Condensed.className}`}>
          <p className='text-center font-bold text-2xl opacity-80'>Élégance en Marche Chaussures de Style</p>
          <h1 className={`text-center tracking-wide text-secondaryColor lg:text-[100px] text-[80px] font-extrabold`}> SHOES HAVEN SHOP</h1>
          {/* <p className='text-center font-semibold'>{categories[count].title}</p> */}
        </div>

        <Image height={2000} width={2000}
          className='lg:aspect-square object-cover w-full lg:max-h-full min-h-full relative'
          src="/banner.png" alt=""
        />
      </div>
      <div className='absolute inset-0 w-full h-full bg-white z-[-1] '></div>
    </section>
  )
}
