"use client"
import { ProfileLinks } from '@/constants/links'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { Link as AdminLink } from '@/types/link.type'


const NavLink = ({ link }: { link: AdminLink }) => {
    const pathName = usePathname()
    const isMatch = (pathName === link.href || link?.subRoute?.includes(pathName))

    return (
        <Link href={link.href} className={`${isMatch ? 'border-secondaryColor' : 'border-transparent opacity-50'} border-b-2 pb-2  font-extrabold cursor-pointer uppercase flex items-center gap-2  hover:opacity-100 duration-300 text-nowrap `} >
                {link.title}
        </Link>
    )
}

export default function ProfileNav() {
    return (
        <div className='w-full border-b border-black/10 mt-10 mb-10'   >
            <div className='flex'>
                <nav className='space-x-4 flex items-center gap-4 text-sm  flex-wrap' >
                    {
                        ProfileLinks.map(link => (
                            <NavLink link={link} />
                        ))
                    }
                </nav>
            </div>
        </div>
    )
}
