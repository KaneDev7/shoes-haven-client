"use client"
import React, { ReactNode, useEffect, useState } from 'react'

type ProductMenuType = {
  isMonseInLink: boolean,
  children : ReactNode, 
}
export default function PopOver({ isMonseInLink, children }: ProductMenuType) {
  const [sowMenu, setShowMenu] = useState(false)
  const [isMonseInMenu, setIsMonseInMenu] = useState(false)

  const toggleMenu = () => {
    if (
      (isMonseInMenu && !isMonseInLink) ||
      (isMonseInLink && !isMonseInMenu) ||
      (isMonseInLink && isMonseInMenu) ||
      (isMonseInMenu)
    ) {
      setShowMenu(true)
    } else {
      setShowMenu(false)
    }
  }
  useEffect(() => {
    toggleMenu()
  }, [isMonseInLink, isMonseInMenu])

  if (sowMenu)
    return (
      <div
        onMouseEnter={() => setIsMonseInMenu(true)}
        onMouseLeave={() => setIsMonseInMenu(false)}
        className={`absolute  w-full top-[100%] left-[50%] translate-x-[-50%] z-[5] translate-y-[100px]  transAnime`}>
            {children}
      </div>
    )
}
