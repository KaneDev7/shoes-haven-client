import useSelectList from '@/hooks/useSelectList'
import { toggleSelectColor } from '@/redux/domains/form/colors.slice'
import { setQueryParams } from '@/redux/domains/products/queryParams.slice'
import React, { useState } from 'react'
import { IoMdCloseCircleOutline } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'

type RenderSelectedFilterType = {
  selectedFilter: string[]
}

export default function RenderSelectedFilter() {
  const selectedFilter = useSelector(state => state.selectedFilter)
  const selectColors = useSelector(state => state.selectColors)
  const dispatch = useDispatch()

  const handleClick = (type, value) => {
    dispatch(toggleSelectColor(value))
    if (selectColors.includes(value)) {
      const selectFilterUpdated = selectColors.filter(item => item !== value)
      return dispatch(setQueryParams([type, selectFilterUpdated.join(',')]))
    }
    const selectFilterUpdated = [...selectColors, value]
    return dispatch(setQueryParams([type, selectFilterUpdated.join(',')]))
  }

  if (selectedFilter.length > 0)
    return (
      <div className='flex items-center gap-4  my-5'>
        {
          selectedFilter.map(item => (
            item &&
            item.value.map(selected => (
              <div className='flex items-center gap-3 py-1 px-4 bg-blackColor2 text-sm text-white font-semibold rounded-full'>
                <p> {selected} </p>
                <IoMdCloseCircleOutline
                  onClick={() => handleClick(item.type, selected)}
                  size={20}
                  className='text-secondaryColor'
                />
              </div>
            ))
          ))
        }
      </div>

    )
}
