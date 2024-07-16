import { Link as LinkType } from '@/types/link.type'
import Link from 'next/link'
import React from 'react'
import { IoIosPlay } from 'react-icons/io'

type LinkListType = {
    title: string,
    linksList: LinkType[],
    titleStyle?: string,
    linkStyle?: string
    icon?: string 
}

const getIcons = (iconName: string | undefined) => {
    switch (iconName) {
        case 'IoIosPlay':
            return <IoIosPlay size={15} className='text-secondaryColor' />
        default:
            break;
    }
}

export default function LinkList({ title, linksList, titleStyle, linkStyle, icon }: LinkListType) {
    return (
        <div className='w-full'>
            <h2 className={`${titleStyle}`} >{title}</h2>
            <ul className='leading-8 text-sm '>
                {
                    linksList.map(link => (
                        <li className={`${linkStyle} flex items-center gap-2 opacity-90 hover:opacity-100 duration-300 text-nowrap`} >
                            <Link href={link.href}>{link.title}</Link>
                            {getIcons(icon)}
                        </li>
                    ))
                }
            </ul>
        </div>

    )
}
