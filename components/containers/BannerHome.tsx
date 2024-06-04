"use client"

import React, { useEffect, useRef, useState } from 'react'
import { Saira_Extra_Condensed } from "next/font/google";
import { HiArrowLongLeft, HiArrowLongRight } from "react-icons/hi2";

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
    }, 5000)
    return function () {
      return clearInterval(timer)
    }
  }, [count])

  return (
    <section className='w-full h-[90vh] banner'>
      <div className='relative h-full'>
        <div className='w-full absolute top-[110px] left-[50%] translate-x-[-50%] z-[2] '>
          <p className='text-center font-bold text-2xl opacity-80'>Élégance en Marche Chaussures de Style</p>
          <h1 className={`text-center tracking-wide text-secondaryColor text-[7rem] font-extrabold ${saira_Extra_Condensed.className}`}>{categories[count].title} </h1>
        </div>
        <div className='slide absolute top-[330px] left-[50%] translate-x-[-50%]'>
          <img
            className='aspect-square w-[700px] max-h-[400px] object-cover z-[-1] '
            src={`/${categories[count].uri}`} alt="" />
        </div>
        <img className='aspect-square w-full  max-h-[90vh] relative' src="/banner.png" alt="" />

        <div className='nav flex justify-between items-center w-[80%] absolute top-[500px] left-[50%] translate-x-[-50%]'>

          <button onClick={handlPrev} className='w-[40px] h-[40px] flex items-center justify-center rounded-full border-2' >
            <HiArrowLongLeft />
          </button>

          <button onClick={handlNext} className='w-[200px] h-[40px] rounded-full flex items-center gap-5 border-2 px-4'>
            <HiArrowLongRight />
            <p>Next</p>
          </button>
        </div>
      </div>
    </section>
  )
}
