import Link from 'next/link'
import React from 'react'
import { adminLink } from '@/constants/links'
import NavAdmin from './Nav.admin'


export default function SideBarAdmin() {

    return (
        <div className='h-screen min-w-[300px] md:block hidden shadow-sm bg-blackColor2 p-5 sticky top-4'>
            <div className=''>
                <Link href='/'>
                    <h1 className='text-2xl font-extrabold text-white mb-20'>Shoes Haven</h1>
                </Link>
                <NavAdmin data={adminLink}/>              
            </div>
        </div>
    )
}
