import useSelectList from '@/hooks/useSelectList'
import { toggleSelectColor } from '@/redux/domains/form/colors.slice'
import { toggleSelectSize } from '@/redux/domains/form/size.slice'
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
  const selectSizes = useSelector(state => state.selectSizes)

  const dispatch = useDispatch()

  const handleClick = (type, value) => {
    switch (type) {
      case 'color':
        dispatch(toggleSelectColor(value))
        if (selectColors.includes(value)) {
          const selectFilterColorUpdated = selectColors.filter(item => item !== value)
          return dispatch(setQueryParams([type, selectFilterColorUpdated.join(',')]))
        }
        const selectFilterColorUpdated = [...selectColors, value]
        return dispatch(setQueryParams([type, selectFilterColorUpdated.join(',')]))
        
        case 'size':
          dispatch(toggleSelectSize(value))
          if (selectSizes.includes(value)) {
            const selectFilterSizeUpdated = selectSizes.filter(item => item !== value)
            return dispatch(setQueryParams([type, selectFilterSizeUpdated.join(',')]))
          }
          const selectFilterSizeUpdated = [...selectSizes, value]
          return dispatch(setQueryParams([type, selectFilterSizeUpdated.join(',')]))

      default:
        break;
    }

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
