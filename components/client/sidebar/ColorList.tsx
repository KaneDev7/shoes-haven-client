"use client"

import { toggleSelectColor } from '@/redux/domains/form/product/colors.slice'
import { setQueryParams } from '@/redux/domains/products/queryParams.slice'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

type ColorListType = {
  title: string,
  colorList: string[],
}

const colorList: string[] = ["Rouge", "Vert", "Bleu", "Jeune", "Orange", "Noir", "Gris", 'Blanc', 'Maron', 'Beige']

const CheckCage = () => {
  return <div className='w-[7px] h-[7px] pointer-events-none absolute inset-0 top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] bg-blackColor2 '>

  </div>
}

export default function ColorList() {
  const selectColors = useSelector(state => state.selectColors)
  const dispatch = useDispatch()

  const handleToggleColor = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const element = event.target as HTMLLIElement
    const colorCliked = element.id.trim()

    dispatch(toggleSelectColor(colorCliked))

    if (selectColors.includes(colorCliked)) {
      const selectColorUpdated = selectColors.filter(item => item !== colorCliked)
      return dispatch(setQueryParams(['color', selectColorUpdated.join(',')]))
    } 
    const selectColorUpdated = [...selectColors, colorCliked]
    return dispatch(setQueryParams(['color', selectColorUpdated.join(',')]))
  }

  return (
    <div className=''>
      <h2>COULEURS</h2>
      <ul className='flex flex-wrap gap-5  mt-5 '>
        {
          colorList.map(color => (
            <li
              onClick={handleToggleColor}
              id={color}
              className='flex items-center gap-2'>
              <div className='w-[12px] h-[12px] pointer-events-none border border-blackColor2 relative'>
                {selectColors.includes(color) && <CheckCage />}
              </div>
              <p className='pointer-events-none text-sm'>{color}</p>
            </li>
          ))
        }
      </ul>
    </div>
  )
}
