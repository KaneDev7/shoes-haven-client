"use client"
import React, { useEffect, useState } from 'react'
import { FaUserLarge } from 'react-icons/fa6'
import { useSelector } from 'react-redux'
import Link from 'next/link'


export default function UserInfos() {
    const currentUser = useSelector(state => state.currentUser)

    const handleDisconnect = () => {
        sessionStorage.removeItem('session')
        sessionStorage.removeItem(`cart_${currentUser?._id}`)
        window.location.href = '/'
    }

    return (
        <div
            className='w-[200px] p-5 bg-white shadow-md  rounded-md z-[5] '>
            <Link href='/acount/profile'>
                <div className='flex flex-col items-center justify-center gap-4'>
                    <div className='w-[50px] h-[50px] p-4 flex justify-center items-center bg-gray-100 rounded-full '>
                        <FaUserLarge size={20} />
                    </div>
                    <p className='text-sm font-semibold cursor-pointer hover:underline'> {currentUser.username} </p>
                </div>
            </Link>

            <ul className='mt-5 text-sm space-y-4'>
                <li>
                    <Link href='/acount/profile'>
                        Informations
                    </Link>
                </li>

                <li>
                    <Link href='/acount/orders'>
                        Commandes
                    </Link>
                </li>

                <li>
                    <Link href='/acount/settings'>
                        Favoris
                    </Link>
                </li>
            </ul>
            <div onClick={handleDisconnect}
                className='w-full mt-5 pt-4 border-t-2 border-gray-200 text-sm cursor-pointer'>
                <p>Se déconnecter</p>
            </div>
        </div>
    )
}
