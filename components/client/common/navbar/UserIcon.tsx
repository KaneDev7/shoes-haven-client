import React from 'react'
import PopOverProvider from '@/context/PopOverProvider'
import PopOverTrigger from './popOver/PopOverTrigger'
import PopOverContent from './popOver/PopOverContent'
import { LuUser2 } from 'react-icons/lu'
import UserInfos from '../../navbar/UserInfos'

export default function UserIcon() {
    return (
        <PopOverProvider spaceY={70}>
            <PopOverTrigger>
                <div className='w-[50px] h-[50px] flex justify-center items-center rounded-full bg-white text-blackColor2  '>
                    <LuUser2 size={20} className='h-[200px]' />
                </div>
            </PopOverTrigger>
            <PopOverContent >
                <UserInfos />
            </PopOverContent>
        </PopOverProvider>
    )
}
