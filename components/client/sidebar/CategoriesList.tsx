"use client"
import { CATEGORY_KEY } from '@/constants/data'
import { FilterTextContext } from '@/context/FilterTextContext'
import { setQueryParams } from '@/redux/domains/products/queryParams.slice'
import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function CategoriesList() {
    const { categories } = useContext(FilterTextContext)
    const queryParams = useSelector(state => state.queryParams)
    const dispatch = useDispatch()
    
    const handleClick = (category) => {
        dispatch(setQueryParams([CATEGORY_KEY, category]))

    }
    return (
        <div className='w-full'>
            <h2 className={`mb-5`} >CATEGORIES</h2>
            <ul className='leading-8 text-xs '>
                <li onClick={() => handleClick('all')} className={`${queryParams.category === "all" && 'border-b-2 border-secondaryColor  text-secondaryColor font-extrabold'} cursor-pointer text-blackColor2 uppercase flex items-center gap-2 opacity-90 hover:opacity-100 duration-300 text-nowrap `} >
                    TOUS LES PRODUITS
                </li>
                {
                    categories.map(category => (
                        <li onClick={() => handleClick(category)} className={`${queryParams.category === category && 'border-b-2 border-secondaryColor  text-secondaryColor font-extrabold'} cursor-pointer text-blackColor2 uppercase flex items-center gap-2 opacity-90 hover:opacity-100 duration-300 text-nowrap `} >
                            {category}
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
