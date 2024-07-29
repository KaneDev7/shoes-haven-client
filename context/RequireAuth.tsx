"use client"
import React, { ReactNode, createContext, useEffect, useState } from 'react'
import { User } from '@/types/user.type'
import { setcurrentUser } from '@/redux/domains/users/currentUser.slice'
import { useDispatch } from 'react-redux'
import { usePathname } from 'next/navigation'
import { privateRoutes } from '@/constants/links'

export const AuthContext = createContext(null)

export default function RequireAuthProvider({ children }: { children: ReactNode }) {
    const [auth, setAuth] = useState<User>()
    const [isLoading, setIsLoading] = useState(true)
    const pathName = usePathname()
    const dispatch = useDispatch()
    
    const isPrivateRoutes = privateRoutes.includes(pathName)

    useEffect(() => {
        const session: User | any = JSON.parse(sessionStorage.getItem('session')) || null
        if(!session && isPrivateRoutes ) return window.location.href = '/login'
        setAuth(session)
        dispatch(setcurrentUser(session))
        setIsLoading(false)
    }, [isLoading])

    if (!isLoading)
        return <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>

}
