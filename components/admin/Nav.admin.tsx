"use client"
import { Link as AdminLink } from '@/types/link.type'
import Link from 'next/link'
import React from 'react'
import { IoSettingsOutline } from "react-icons/io5";
import { usePathname } from 'next/navigation'
type NavAdminType = {
    data: AdminLink[]
}


const getIcons = (iconName: string | undefined) => {

    switch (iconName) {
        case 'IoIosPlay':
            return <IoSettingsOutline size={20}  />
        default:
            break;
    }
}
const navActif = 'bg-secondaryColor font-bold'

export default function NavAdmin({ data }: NavAdminType) {
    const pathName = usePathname()
    return (
        <ul className='space-y-5'>
            {
                data.map((item) => (
                    <li key={item.href} className={`${pathName === item.href && navActif} rounded-md  text-blackColor2 py-3 px-4`} >
                        <Link href={item.href} className='flex items-center gap-2'>
                            {getIcons('IoIosPlay')}
                            <p>{item.title} </p>
                        </Link>
                    </li>
                ))
            }
        </ul>
    )
}
