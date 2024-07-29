import React, { useContext } from 'react'
import Link from 'next/link'
import Button from '@/components/shared/buttons'
import { AuthContext } from '@/context/RequireAuth'
import CartIcon from './CartIcon'
import SearchIcon from './SearchIcon'
import UserIcon from './UserIcon'


export default function NavbarRightPart() {
    const { auth } = useContext(AuthContext)

    if (auth) {
        return <div className='flex justify-between items-center gap-4 '>
            <SearchIcon />
            <UserIcon />
            <CartIcon />
        </div>
    }
    return <div className='flex items-center gap-4 '>
        <Link href='/register'>
            <Button text="S'inscrire" style='w-full h-[40px]  bg-black text-white/85 font-bold rounded-md' />
        </Link>
        <Link href='/login'>
            <Button text="Se connecter" style='w-full h-[40px]  bg-secondaryColor text-blackColor2 font-bold rounded-md' />
        </Link>
    </div>

}

