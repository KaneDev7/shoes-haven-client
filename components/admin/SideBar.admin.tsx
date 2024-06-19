import Link from 'next/link'
import React from 'react'
import { adminLink } from '@/constants/links'
import NavAdmin from './Nav.admin'


export default function SideBarAdmin() {

    return (
        <div className='h-screen min-w-[300px]  bg-white p-5'>
            <div className='sticky top-4'>
                <Link href='/'>
                    <h1 className='text-3xl font-extrabold mb-20'>Shoes Haven</h1>
                </Link>
                <NavAdmin data={adminLink}/>              
            </div>
        </div>
    )
}