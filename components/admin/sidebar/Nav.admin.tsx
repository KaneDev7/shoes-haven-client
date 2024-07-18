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


const NavLink = ({ link }: { link: AdminLink }) => {
    const pathName = usePathname()

    const isMatch = (pathName === link.href || link?.subRoute?.includes(pathName) || link.title === 'Produits' && pathName.startsWith(link.subRoute![1]))
    return (

        <Link href={link.href} className='block text-xs rounded-md hover:bg-gray-100 '>
            <li key={link.href} className={`flex items-center  gap-2 ${isMatch && navActif} rounded-md  text-blackColor2 py-3 px-4`} >
                {getIcons(link.iconName)}
                <p>{link.title} </p>
            </li>
        </Link>
    )
}

export default function NavAdmin({ data }: NavAdminType) {

    return (
        <ul className='space-y-5'>
            {
                data.map((link, index) => (
                    <NavLink
                        key={index}
                        link={link}
                    />
                ))
            }
        </ul>
    )
}