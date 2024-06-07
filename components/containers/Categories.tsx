import React from 'react'
import Button from '../buttons'
import Image from 'next/image'
import CatCard from '../CatCard'

export default function Categories() {
  return (
    <div className='w-full'>
      <div className='globalMaxWidth h-[900px] mx-auto grid grid-cols-3 grid-rows-2 gap-4 '>
        <CatCard style='col-span-1' imgSrc='/categories/1.jpg' />
        <CatCard style='col-span-1' imgSrc='/categories/2.jpg' />
        <CatCard style='col-span-1' imgSrc='/categories/3.jpg' />
        <CatCard style='col-span-1' imgSrc='/categories/4.jpg' />
        <CatCard style='col-span-2' imgSrc='/categories/5.jpg' />


      </div>
    </div>
  )
}
