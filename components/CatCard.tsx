import React from 'react'
import Button from './buttons'
import Image from 'next/image'

export default function CatCard({style, imgSrc}:{style : string, imgSrc : string}) {
  return (
    <div className={`${style} h-[400px] rounded-lg overflow-hidden relative`} >
    <div className='w-full flex items-end absolute inset-0 z-[1] bg-gradient-to-t from-black/80 to-black/5'>
      <div className='text-white space-y-4 m-4' >
        <h2 className='text-3xl font-bold'>CHAUSSURES DE MODE</h2>
        <p>
          Soyez à la pointe de l'élégance avec nos chaussures de mode,
          alliant design avant-gardiste et qualité exceptionnelle
        </p>
        <Button text='Découvrir' style='bg-secondaryColor py-2 text-black font-bold rounded-full' />
      </div>
    </div>
    <Image
      className='absolute z-[-1] w-full h-full object-cover'    
      src={imgSrc} width={500} height={500} alt=""
    />
  </div>
  )
}
