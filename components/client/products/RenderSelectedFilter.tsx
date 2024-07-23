import { setSelectColors, toggleSelectColor } from '@/redux/domains/form/product/colors.slice'
import { setSelectMark, toggleSelectMark } from '@/redux/domains/form/product/mark.slice'
import { setSelectSize, toggleSelectSize } from '@/redux/domains/form/product/size.slice'
import { setSelectedFilter } from '@/redux/domains/products/SelectedFilter.slice'
import { initQueryParams, setQueryParams } from '@/redux/domains/products/queryParams.slice'
import { usePathname } from 'next/navigation'
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
  const selectMarks = useSelector(state => state.selectMarks)
  const queryParams = useSelector(state => state.queryParams)

  const dispatch = useDispatch()
  const pathName = usePathname()

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

      case 'mark':
        dispatch(toggleSelectMark(value))
        if (selectMarks.includes(value)) {
          const selectFilterMarkUpdated = selectMarks.filter(item => item !== value)
          return dispatch(setQueryParams([type, selectFilterMarkUpdated.join(',')]))
        }
        const selectFilterMarkUpdated = [...selectMarks, value]
        return dispatch(setQueryParams([type, selectFilterMarkUpdated.join(',')]))
      default:
        break;
    }
  }

  const handleResetFilter = () => {
    dispatch(setSelectedFilter([]))
    dispatch(initQueryParams())
    dispatch(setSelectColors([]))
    dispatch(setSelectSize([]))
    dispatch(setSelectMark([]))
    dispatch(initQueryParams())
  }

  if ((selectedFilter.length > 0) || (queryParams.price_lte || queryParams.price_gte ) && pathName === '/products')
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
          className='text-red-400 cursor-pointer hover:underline text-sm'>Effacer les filtres
        </p>
      </div>
    )
}
