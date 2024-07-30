import React, { useContext } from 'react'
import LinkList from '../footer/LinkList'
import Image from 'next/image'
import FilterLinkList from './FilterLinkList'
import { FilterTextContext } from '@/context/FilterTextContext'
import { CATEGORY_KEY } from '@/constants/data'


export default function MegaMenu() {
  const {marks, categories} = useContext(FilterTextContext)

  return (
    <ul className='translate-x-[60px] min-w-[1200px] bg-white flex  p-10 rounded-md shadow-md gap-20'>
      <li className='max-w-[250px] w-full '>
        <FilterLinkList
          filterData={categories}
          title='CATEGORIES'
          type={CATEGORY_KEY}
        />
      </li>

      <li className='max-w-[250px] w-full '>
        <FilterLinkList
          filterData={marks}
          title='MARQUES'
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
            className='w-full  h-[100px] rounded-md object-cover'
          />
          <Image
            width={400}
            height={400}
            src='/menu/2.jpg'
            alt=''
            className='w-full h-[200px] rounded-md object-cover'
          />
        </div>
      </li>
    </ul>
  )
}
