import { setSelectColors } from '@/redux/domains/form/product/colors.slice'
import { setSelectMark } from '@/redux/domains/form/product/mark.slice'
import { setSelectSize } from '@/redux/domains/form/product/size.slice'
import { setSelectedFilter } from '@/redux/domains/products/SelectedFilter.slice'
import { initQueryParams } from '@/redux/domains/products/queryParams.slice'
import { dispatchQueryParams } from '@/utils/commun'
import { usePathname } from 'next/navigation'
import React from 'react'
import { IoMdCloseCircleOutline } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'

export default function RenderSelectedFilter() {
  const selectedFilter = useSelector(state => state.selectedFilter)
  const queryParams = useSelector(state => state.queryParams)
  const pathName = usePathname()

  const dispatch = useDispatch()

  const handleClick = (key: string, value:string) => {
    dispatchQueryParams(key, value)
  }

  const handleResetFilter = () => {
    dispatch(setSelectedFilter([]))
    dispatch(initQueryParams())
    dispatch(setSelectColors([]))
    dispatch(setSelectSize([]))
    dispatch(setSelectMark([]))
    dispatch(initQueryParams())
  }

  if ((selectedFilter.length > 0) || (queryParams.price_lte || queryParams.price_gte) && pathName === '/products')
    return (
      <div>
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
          <p onClick={handleResetFilter} className='text-red-400 cursor-pointer hover:underline text-sm'> Effacer les filtres</p>
        </div>
        
        <div className='flex items-center gap-4 text-sm'>
            {queryParams.price_gte && <p>Prix minimum : {queryParams.price_gte} FCFA </p>}
            {queryParams.price_lte && <p>Prix maximum : {queryParams.price_lte} FCFA </p>}
          </div>
      </div>
    )
}
