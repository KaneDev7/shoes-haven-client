import { setSelectColors, toggleSelectColor } from '@/redux/domains/form/colors.slice'
import { setSelectSize, toggleSelectSize } from '@/redux/domains/form/size.slice'
import { setSelectedFilter } from '@/redux/domains/products/SelectedFilter.slice'
import { initQueryParams, setQueryParams } from '@/redux/domains/products/queryParams.slice'
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


  console.log('selectedFilter', selectedFilter)
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

  const handleResetFilter = () => {
    dispatch(setSelectedFilter([]))
    dispatch(initQueryParams())
    dispatch(setSelectColors([]))
    dispatch(setSelectSize([]))
  }

  if (selectedFilter.length > 0)
    return (
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-4  my-5'>
          {
            selectedFilter.map(item => (
              item && item.type !== 'price' &&
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
        <p
          onClick={handleResetFilter}
          className='text-red-400 cursor-pointer hover:underline text-sm'>Supprimer les filtres</p>
      </div>
    )
}
