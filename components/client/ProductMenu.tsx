"use client"
import { Collections, Marks } from '@/constants/links'
import React, { useEffect, useState } from 'react'
import LinkList from './LinkList'
import Image from 'next/image'

type ProductMenuType = {
  isMonseInLink: boolean
}
export default function ProductMenu({ isMonseInLink }: ProductMenuType) {
  const [sowMenu, setShowMenu] = useState(false)
  const [isMonseInMenu, setIsMonseInMenu] = useState(false)

  const toggleMenu = () => {
    if (
      (isMonseInMenu && !isMonseInLink) ||
      (isMonseInLink && !isMonseInMenu) ||
      (isMonseInLink && isMonseInMenu) ||
      (isMonseInMenu)
    ) {
      setShowMenu(true)
    } else {
      setShowMenu(false)
    }
  }
  useEffect(() => {
    toggleMenu()
  }, [isMonseInLink, isMonseInMenu])

  if (sowMenu)
    return (
      <div
        onMouseEnter={() => setIsMonseInMenu(true)}
        onMouseLeave={() => setIsMonseInMenu(false)}
        className='absolute  max-w-[1300px] w-full   top-[100%] left-[50%] translate-x-[-50%] z-[5] translate-y-[100px] opacity-0 transAnime '>

        <ul className='min-h-[500px] flex bg-white p-10 rounded-md shadow-md gap-20 '>
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
      </div>
    )
}
