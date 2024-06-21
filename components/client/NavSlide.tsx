import React from 'react'
import { HiArrowLongLeft, HiArrowLongRight } from 'react-icons/hi2'

type PropsType = {
  handlPrev?: () => void,
  handlNext?: () => void,
  style: string
}

export default function NavSlide({ handlPrev, handlNext, style }: PropsType) {

  return (
    <div className={` nav flex justify-between items-center ${style} `} >

      <button onClick={handlPrev} className={`w-[40px] h-[40px] p-1 flex items-center justify-center rounded-full border-2`} >
        <HiArrowLongLeft />
      </button>

      <button onClick={handlNext} className={`w-[200px] h-[40px] p-1 rounded-full flex items-center gap-5 border-2 px-4`} >
        <HiArrowLongRight />
        <p>Next</p>
      </button>
    </div>
  )
}
