"use client"

import React, { useEffect, useState } from 'react'
import { Saira_Extra_Condensed } from "next/font/google";
import { HiArrowLongLeft, HiArrowLongRight } from "react-icons/hi2";
import NavSlide from '../NavSlide';

const saira_Extra_Condensed = Saira_Extra_Condensed({ weight: ['700'], subsets: ['latin'] });


interface Category { title: string, uri: string }

export default function BannerHome() {
  const [count, setCout] = useState(0)
  const [categories, setImages] = useState<Array<Category>>([
    { title: 'CHAUSSURES DE SPORT', uri: '1.jpeg' },
    { title: 'CHAUSSURES FORMELLES', uri: '2.jpg' },
    { title: 'CHAUSSURES DE MODE', uri: '3.jpg' },
    { title: 'CHAUSSURES DECONTRACTES', uri: '4.jpg' },
    { title: 'SANDALES', uri: '5.jpg' },
  ])



  const handlNext = () => {
    setCout(v => v < 4 ? v + 1 : 0)
  }

  const handlPrev = () => {
    setCout(v => v > 0 ? v - 1 : 4)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCout(v => v < 4 ? v + 1 : 0)
    }, 10000)
    return function () {
      return clearInterval(timer)
    }
  }, [count])

  return (
    <section className='w-full h-[90vh] banner relative'>
      <div className='relative h-full'>
        <div className={`w-full absolute top-[110px] left-[50%] translate-x-[-50%] z-[2]  ${saira_Extra_Condensed.className}`}>
          <p className='text-center font-bold text-2xl opacity-80'>Élégance en Marche Chaussures de Style</p>
          <h1 className={`text-center tracking-wide text-secondaryColor text-[90px] font-extrabold`}> SHOES HAVEN SHOP</h1>
          <p className='text-center font-semibold'>{categories[count].title}</p>
        </div>
        <div className='slide absolute top-[330px] left-[50%] translate-x-[-50%]'>
          <img
            className='aspect-square w-[700px] max-h-[400px] object-contain z-[-1] '
            src={`/${categories[count].uri}`} alt="" />
        </div>
        <img className='aspect-square w-full  max-h-[90vh] relative' src="/banner.png" alt="" />

        <NavSlide
          handlNext={handlNext}
          handlPrev={handlPrev}
          style=' w-[80%]  absolute top-[500px] left-[50%] translate-x-[-50%]'
        />
      </div>
      <div className='absolute inset-0 w-full h-full bg-white z-[-1] '></div>
    </section>
  )
}
