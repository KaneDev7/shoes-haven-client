import Link from 'next/link'
import React from 'react'
import { IoSearch } from "react-icons/io5";
import { LuUser2 } from "react-icons/lu";
import { IoBagOutline } from "react-icons/io5";

export default function Navbar() {
    return (
        <section className='w-full max-h-[90px] p-2 flex justify-center items-center  bg-backgroundBody'>
            <div className='flex justify-between items-center  globalMaxWidth'>
                <h1 className='text-3xl font-extrabold'>Shoe Haven</h1>

                <nav className='w-fit flex justify-between items-center rounded-full py-3 px-5 bg-white gap-6 text-xs font-bold shadow-sm'>
                    <Link href='/'>ACCUEIL</Link>
                    <Link href='/'>COLLECTIONS</Link>
                    <Link href='/'>A PROPOS</Link>
                    <Link href='/'>CONTACT</Link>
                </nav>

                <div className='flex justify-between items-center gap-4'>
                    <div className='w-[50px] h-[50px] flex justify-center items-center rounded-full bg-white text-blackColor2 '>
                        <IoSearch size={20}/>
                    </div>
                    <div className='w-[50px] h-[50px] flex justify-center items-center rounded-full bg-white text-blackColor2 '>
                        <LuUser2 size={20}/>
                    </div>
                    <div className='w-[50px] h-[50px] flex justify-center items-center rounded-full bg-white text-blackColor2 '>
                        <IoBagOutline size={20}/>
                    </div>
                </div>
            </div>
        </section>
    )
}
