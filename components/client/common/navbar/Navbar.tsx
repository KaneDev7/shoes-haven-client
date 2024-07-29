'use client'
import Link from 'next/link'
import React from 'react'
import NavbarRightPart from './NavbarRightPart';
import CollectionLink from './CollectionLink';


export default function Navbar() {
    return (
        <section className='relative w-full max-h-[90px] px-2 py-4 flex justify-center items-center bg-backgroundBody  shadow-sm'>
            <div className='flex justify-between items-center globalMaxWidth'>
                <Link href='/'>
                    <h1 className='text-3xl font-extrabold'>Shoes Haven</h1>
                </Link>
                <nav className='w-fit lg:flex hidden justify-between items-center rounded-full px-10 bg-white gap-10 text-xs font-bold shadow-sm '>
                    <Link href='/'>ACCUEIL</Link>
                    <CollectionLink/>
                    <Link href='/'>A PROPOS</Link>
                    <Link href='/'>CONTACT</Link>
                </nav>
                <NavbarRightPart />
            </div>
        </section>
    )
}
