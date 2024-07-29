"use client"
import React, { ReactNode, createContext, useEffect, useState } from 'react'

type ProductMenuType = {
  children: ReactNode,
  spaceY? : number
}

export const PopOverContext = createContext(null)

export default function PopOverProvider({ children, spaceY  }: ProductMenuType) {
  const [isMonseInContent, setIsMonseInContent] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [isMonseInElement, setIsMonseInElement] = useState(false)

  const toggleMenu = () => {
    if (
      (isMonseInContent && !isMonseInElement) ||
      (isMonseInElement && !isMonseInContent) ||
      (isMonseInContent)
    ) {
      setShowContent(true)
    } else {
      setShowContent(false)
    }
  }
  useEffect(() => {
    toggleMenu()
  }, [isMonseInContent,isMonseInElement ])

  return (
    <PopOverContext.Provider value={{
      showContent,
      spaceY,
      setIsMonseInContent,
      setShowContent,
      setIsMonseInElement,
    }}>
      <div className='relative'>
      {children}
      </div>
    </PopOverContext.Provider>
  )
}



