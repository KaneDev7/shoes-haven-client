"use client"
import { Link as AdminLink } from '@/types/link.type'
import Link from 'next/link'
import React from 'react'
import { IoSettingsOutline } from "react-icons/io5";
import { usePathname } from 'next/navigation'
import { MdOutlineDashboard } from 'react-icons/md';
import { AiOutlineProduct } from 'react-icons/ai';
import { BsCart2 } from 'react-icons/bs';
import { FiUser } from 'react-icons/fi';


type NavAdminType = {
    data: AdminLink[]
}

const getIcons = (iconName: string | undefined) => {

    switch (iconName) {
        case 'MdOutlineDashboard':
            return <MdOutlineDashboard size={20} />
        case 'AiOutlineProduct':
            return <AiOutlineProduct size={20} />
        case 'BsCart2':
            return <BsCart2 size={20} />
        case 'FiUser':
            return <FiUser size={20} />
        case 'IoSettingsOutline':
            return <IoSettingsOutline size={20} />
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
                    <Link href={item.href} className='block'>
                        <li key={item.href} className={`flex items-center gap-2 ${pathName === item.href && navActif} rounded-md  text-blackColor2 py-3 px-4`} >
                            {getIcons(item.iconName)}
                            <p>{item.title} </p>
                        </li>
                    </Link>
                ))
            }
        </ul>
    )
}
