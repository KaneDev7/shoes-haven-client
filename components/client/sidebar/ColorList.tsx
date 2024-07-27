"use client"

import { COLORS_DATA, COLOR_KEY } from '@/constants/data'
import { toggleSelectColor } from '@/redux/domains/form/product/colors.slice'
import { dispatchQueryParams } from '@/utils/commun'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CageCheckList from './CageCheckList'


export default function ColorList() {
  const selectColors = useSelector(state => state.selectColors)
  const dispatch = useDispatch()

  const handleToggleColor = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const element = event.target as HTMLLIElement
    const colorCliked = element.id.trim()
    dispatch(toggleSelectColor(colorCliked))
    dispatchQueryParams(COLOR_KEY, colorCliked)
  }

  return (
    <CageCheckList
      title='COULEURS'
      list={COLORS_DATA}
      selectData={selectColors}
      handleToggleCheck={handleToggleColor}
    />
  )
}
