"use client"
import React, { useEffect, useState } from 'react'
import ColorList from './ColorList'
import Sizes from './Sizes'
import RangeSlider from './RangeSlide'
import useCategoryList from '@/hooks/useCategoryList'
import { useDispatch, useSelector } from 'react-redux'
import { setQueryParams } from '@/redux/domains/products/queryParams.slice'
import MarkList from './markList'

export default function SideBar() {
    const { categories } = useCategoryList()
    const dispatch = useDispatch()
    const queryParams = useSelector(state => state.queryParams)

    const handleClick = (category) => {
        dispatch(setQueryParams(['category', category]))
    }

    return (
        <aside className='sidebar lg:max-w-[300px]  rounded-md mb-10 py-10 px-7 lg:sticky static top-0 '>
            <div className=' flex lg:flex-col flex-row flex-wrap gap-10 '>
                <div className='w-full'>
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
                </div>
                <ColorList />
                <div>
                    <h2 className='mb-5'>TAILLES</h2>
                    <Sizes
                        style='gap-4'
                        sizes={[40, 41, 42, 43, 44, 45, 46]} />
                </div>
                <MarkList />
                <div>
                    <h2 className='mb-5'>FILTRER PAR PRIX</h2>
                    <RangeSlider />
                </div>
            </div>
        </aside>
    )
}
