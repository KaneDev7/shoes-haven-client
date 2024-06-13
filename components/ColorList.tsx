"use client"

import React, { useState } from 'react'

type ColorListType = {
  title: string,
  colorList: string[],
}

const colorList: string[] = ["Rouge", "Vert", "Bleu", "Jeune", "Orange", "Noir", "Gris"]

const CheckCage = () => {
  return <div className='w-[7px] h-[7px] pointer-events-none absolute inset-0 top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] bg-blackColor2 '>

  </div>
}

export default function ColorList() {
  const [checklist, setChecklist] = useState<string[]>(['Bleu'])

  const handleToggleColor = (event:  React.MouseEvent<HTMLLIElement, MouseEvent>) => {
   const element = event.target as HTMLLIElement
   const colorCliked = element.id

   if(checklist.includes(element.id)){
    return setChecklist(prevChecklist => prevChecklist.filter(color => color !== colorCliked))
   }
    setChecklist(prevChecklist => [...prevChecklist, colorCliked] )
  }

  return (
    <div className=''>
      <h2>COULEURS</h2>
      <ul className='flex flex-wrap gap-5 max-w-[300px] mt-5 '>
        {
          colorList.map(color => (
            <li
              onClick={handleToggleColor}
              id={color}
              className='flex items-center gap-2'>
              <div className='w-[12px] h-[12px] pointer-events-none border border-blackColor2 relative'>
                {checklist.includes(color) && <CheckCage />}
              </div>
              <p className='pointer-events-none text-sm'>{color}</p>
            </li>
          ))
        }
      </ul>
    </div>
  )
}
