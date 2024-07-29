import React from 'react'
import LinkList from '../footer/LinkList'
import { Collections, Marks } from '@/constants/links'
import Image from 'next/image'


export default function MegaMenu() {
  return (
    <ul className=' min-h-[500px] bg-white flex  p-10 rounded-md shadow-md gap-20'>
      <li className='max-w-[250px] w-full '>
        <LinkList
          linksList={Collections}
          title='CATEGORIES'
          titleStyle='text-secondaryColor font-extrabold pb-2 border-b-2 border-secondaryColor mb-4'
          linkStyle='text-blackColor2 '
        />
      </li>

      <li className='max-w-[250px] w-full '>
        <LinkList
          linksList={Marks}
          title='MARQUES'
          titleStyle='text-secondaryColor font-extrabold pb-2 border-b-2 border-secondaryColor mb-4'
          linkStyle='text-blackColor2 capitalize'
        />
      </li>

      <li className=''>
        <LinkList
          linksList={[
            { title: 'Nouveautées', href: '#' },
            { title: 'Meilleurs Ventes', href: '#' }
          ]}
          title=''
          titleStyle='hidden'
          linkStyle='text-blackColor2 capitalize'
          icon='IoIosPlay'
        />
      </li>

      <li className='w-[500px]  '>
        <div className='w-full space-y-5'>
          <Image
            width={400}
            height={400}
            src='/menu/1.png'
            alt=''
            className='w-full  h-[120px] rounded-md object-cover'
          />
          <Image
            width={400}
            height={400}
            src='/menu/2.jpg'
            alt=''
            className='w-full h-[300px] rounded-md'
          />
        </div>
      </li>
    </ul>
  )
}
