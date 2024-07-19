"use client"
import React, { useEffect, useState } from 'react'
import LinkList from '../footer/LinkList'
import { Collections } from '@/constants/links'
import ColorList from './ColorList'
import Sizes from './Sizes'
import RangeSlider from './RangeSlide'
import { useQuery } from '@tanstack/react-query'
import { getCategories } from '@/api/categories'
import useCategoryList from '@/hooks/useCategoryList'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { initQueryParams, setQueryParams } from '@/redux/domains/products/queryParams.slice'

export default function SideBar() {
    const { categories } = useCategoryList()
    const router = useRouter()
    const dispatch = useDispatch()
    const queryParams = useSelector(state => state.queryParams)

    const handleClick = (category) => {
        dispatch(initQueryParams())
        dispatch(setQueryParams(['category', category]))
        router.push(`/products`)
    }

    return (
        <aside className='sidebar min-w-[350px] bg-white rounded-md mb-10 py-10 px-7  '>
            <div className=' flex lg:flex-col flex-row flex-wrap gap-20 sticky top-10'>
                <div className='w-[300px] '>
                    <div className='w-full'>
                        <h2 className={`mb-5`} >CATEGORIES</h2>
                        <ul className='leading-8 text-sm '>
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

                <div>
                    <h2 className='mb-5'>FILTRER PAR PRIX</h2>
                    <RangeSlider />
                </div>
            </div>
        </aside>
    )
}
