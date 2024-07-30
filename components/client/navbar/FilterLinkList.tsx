import { CATEGORY_KEY, MARK_KEY } from '@/constants/data'
import { PopOverContext } from '@/context/PopOverProvider'
import { toggleSelectMark } from '@/redux/domains/form/product/mark.slice'
import { initQueryParams, setQueryParams } from '@/redux/domains/products/queryParams.slice'
import { dispatchQueryParams } from '@/utils/commun'
import { useRouter } from 'next/navigation'
import React, { useContext } from 'react'
import { useDispatch } from 'react-redux'

type FilterLinkListType = {
    filterData: string[],
    title: string
    type?: 'category' | 'mark'
}
export default function FilterLinkList({ filterData, title, type }: FilterLinkListType) {
    const router = useRouter()
    const dispatch = useDispatch()
    const { setShowContent } = useContext(PopOverContext)

    const handleClick = (filter: string) => {
        dispatch(initQueryParams())
        if (type === CATEGORY_KEY) {
            dispatch(setQueryParams([CATEGORY_KEY, filter]))
        } else {
            dispatch(toggleSelectMark(filter))
            dispatchQueryParams(MARK_KEY, filter)
        }
        setShowContent(false)
        router.push(`/products`)
    }
    return (
        <div>
            <h2 className='text-secondaryColor text-lg font-bold pb-2 border-b-2 border-secondaryColor mb-4' >{title}</h2>
            <ul className=''>

                {
                    filterData.map(filter => (
                        <li
                            onClick={() => handleClick(filter)}
                            className={`cursor-pointer hover:text-secondaryColor leading-6 font-medium text-blackColor2 uppercase flex items-center gap-2 duration-300 text-xs text-nowrap`} >
                            {filter}
                        </li>
                    ))
                }
                {type === CATEGORY_KEY &&
                    <li
                        onClick={() => handleClick('all')}
                        className={`cursor-pointer hover:text-secondaryColor leading-6 font-medium text-blackColor2 uppercase flex items-center gap-2 duration-300 text-xs text-nowrap`} >
                        TOUS LES PRODUITS
                    </li>
                }

            </ul>
        </div>
    )
}
