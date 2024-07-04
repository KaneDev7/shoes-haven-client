"use client"
import React, { ReactNode, createContext, useEffect, useState } from 'react'
import { User } from '@/types/user.type'
import { setcurrentUser } from '@/redux/domains/users/currentUser.slice'
import { useDispatch } from 'react-redux'

export const AuthContext = createContext(null)

export default function RequireAuthProvider({ children }: { children: ReactNode }) {
    const [auth, setAuth] = useState<User>()
    const [isLoading, setIsLoading] = useState(true)
    const dispatch = useDispatch()
    
    useEffect(() => {
        const session: User | any = JSON.parse(sessionStorage.getItem('session')) || null
        setAuth(session)
        dispatch(setcurrentUser(session))
        setIsLoading(false)
    }, [isLoading])

    if (!isLoading)
        return <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>

}
