"use client"
import { productAdminLink } from '@/constants/links'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { Link as AdminLink } from '@/types/link.type'



const NavLink = ({ link }: { link: AdminLink }) => {
  const pathName = usePathname()
  const isMatch = (pathName === link.href || link?.subRoute?.includes(pathName) || link.title === 'Produits' && pathName.startsWith(link.subRoute![0]))

  return (
      <Link href={link.href}  className={`${isMatch ? 'border-secondaryColor' : 'border-transparent opacity-50'} border-b-2  font-extrabold cursor-pointer uppercase flex items-center gap-2  hover:opacity-100 duration-300 text-nowrap `} >
      <li >
        {link.title}
      </li>
    </Link>
  )
}

export default function ProductNav() {

  return (
    <ul className='leading-8 text-sm flex items-center gap-4 mt-4'>
      {
        productAdminLink.map(link => (
          <NavLink link={link} />
        ))
      }
    </ul>
  )
}

