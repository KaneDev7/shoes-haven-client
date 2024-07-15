import React from 'react'
import CatCard from '../categories/CatCard'

export default function Categories() {
  return (
    <div className='w-full p-5 mt-10'>
      <div className='globalMaxWidth  mx-auto grid md:grid-cols-4 lg:grid-cols-3 grid-rows-2 gap-4 '>
        <CatCard style='lg:col-span-1 md:col-span-2' imgSrc='/categories/1.jpg' />
        <CatCard style='lg:col-span-1 md:col-span-2' imgSrc='/categories/2.jpg' />
        <CatCard style='lg:col-span-1 md:col-span-2' imgSrc='/categories/3.jpg' />
        <CatCard style='lg:col-span-1 md:col-span-2' imgSrc='/categories/4.jpg' />
        <CatCard style='lg:col-span-2 md:col-span-4' imgSrc='/categories/5.jpg' />
      </div>
    </div>
  )
}
