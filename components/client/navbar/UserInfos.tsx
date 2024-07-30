"use client"
import React, { useContext, useEffect, useState } from 'react'
import { FaUserLarge } from 'react-icons/fa6'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { PopOverContext } from '@/context/PopOverProvider'

export default function UserInfos() {
    const currentUser = useSelector(state => state.currentUser)
    const { setShowContent } = useContext(PopOverContext)
    const router = useRouter()

    const handleDisconnect = () => {
        sessionStorage.removeItem('session')
        sessionStorage.removeItem(`cart_${currentUser?._id}`)
        window.location.href = '/'
    }

    const handeleNavigateTo = (url : string) => {
        setShowContent(false)
        router.push(url)
    }

    return (
        <div
            className='w-[200px] p-5 bg-white shadow-md  rounded-md z-[5]  '>
            <div
                onClick={() => handeleNavigateTo('/acount/profile')}
                className='flex flex-col items-center justify-center gap-4 cursor-pointer'>
                <div className='w-[50px] h-[50px] p-4 flex justify-center items-center bg-gray-100 rounded-full '>
                    <FaUserLarge size={20} />
                </div>
                <p className='text-sm font-semibold cursor-pointer hover:underline'> {currentUser.username} </p>
            </div>

            <ul className='mt-5 text-sm space-y-4'>
                <li className='cursor-pointer' onClick={() => handeleNavigateTo('/acount/profile')}>
                    Informations
                </li>

                <li className='cursor-pointer' onClick={() => handeleNavigateTo('/acount/orders')}>
                    Commandes
                </li>

                <li className='cursor-pointer' onClick={() => handeleNavigateTo('/acount/settings')}>
                    Favoris
                </li>
            </ul>
            <div onClick={handleDisconnect}
                className='w-full mt-5 pt-4 border-t-2 border-gray-200 text-sm cursor-pointer'>
                <p>Se déconnecter</p>
            </div>
        </div>
    )
}
