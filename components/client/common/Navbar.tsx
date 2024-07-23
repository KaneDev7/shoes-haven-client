'use client'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { IoChevronDownSharp, IoSearch } from "react-icons/io5";
import { LuUser2 } from "react-icons/lu";
import { IoBagOutline } from "react-icons/io5";
import ProductMenu from '../navbar/ProductMenu';
import { AuthContext } from '@/context/RequireAuth';
import { CartContext } from '@/context/cartContext';
import Button from '../shared/buttons';
import UserInfos from '../navbar/UserInfos';


const NavbarRightPart = () => {
    const { auth } = useContext(AuthContext)
    const { cartQuantities } = useContext(CartContext)

    const [isMonseInLink, setIsMonseInLink] = useState(false)
    const handleEnableMenu = () => {
        setIsMonseInLink(true)
    }

    const handleDesableMenu = () => {
        setIsMonseInLink(false)
    }

    if (auth) {
        return <div className='flex justify-between items-center gap-4 '>
            <div className='w-[50px] h-[50px] flex justify-center items-center rounded-full bg-white text-blackColor2 '>
                <IoSearch size={20} />
            </div>
            <div
                onMouseEnter={handleEnableMenu}
                onMouseLeave={handleDesableMenu}
                className='w-[50px] h-[50px] flex justify-center items-center rounded-full bg-white text-blackColor2  '>
                <LuUser2 size={20} className='h-[200px]' />
            </div>

            <Link href='/cart'>
                <div className='w-[50px] h-[50px] flex justify-center items-center rounded-full bg-white text-blackColor2 relative'>
                    <IoBagOutline size={20} />
                    <span
                        className='w-[20px] h-[20px] flex justify-center items-center absolute right-[-4px] text-[11px]  top-[-4px] rounded-full bg-red-600 text-white font-bold '>
                        {cartQuantities}
                    </span>
                </div>
            </Link>
            <UserInfos isMonseInLink={isMonseInLink} />
        </div>
    } else {
        return <div className='flex items-center gap-4 '>
            <Link href='/register'>
                <Button
                    text="S'inscrire"
                    style='w-full h-[40px]  bg-black text-white/85 font-bold rounded-md'
                />
            </Link>
            <Link href='/login'>
                <Button
                    text="Se connecter"
                    style='w-full h-[40px]  bg-secondaryColor text-blackColor2 font-bold rounded-md'
                />
            </Link>
        </div>

    }
}


export default function Navbar() {
    const [isMonseInLink, setIsMonseInLink] = useState(false)
    const handleEnableMenu = () => {
        setIsMonseInLink(true)
    }

    const handleDesableMenu = () => {
        setIsMonseInLink(false)
    }

    return (
        <section className='relative w-full max-h-[90px] px-2 py-4 flex justify-center items-center bg-backgroundBody  shadow-sm'>
            <div className='flex justify-between items-center globalMaxWidth'>
                <Link href='/'>
                    <h1 className='text-3xl font-extrabold'>Shoes Haven</h1>
                </Link>
                <nav className='w-fit lg:flex hidden justify-between items-center rounded-full px-10 bg-white gap-10 text-xs font-bold shadow-sm '>
                    <Link href='/'>ACCUEIL</Link>
                    <Link
                        href='/'
                        onMouseEnter={handleEnableMenu}
                        onMouseLeave={handleDesableMenu}
                        className='flex gap-2 py-3 relative'>
                        <span className='w-[100px] h-[200px] inset-0 absolute '></span>
                        <p>COLLECTIONS</p>
                        <IoChevronDownSharp size={15} />
                    </Link>
                    <Link href='/'>A PROPOS</Link>
                    <Link href='/'>CONTACT</Link>
                    <ProductMenu isMonseInLink={isMonseInLink} />
                </nav>
                <NavbarRightPart />
            </div>
        </section>
    )
}
