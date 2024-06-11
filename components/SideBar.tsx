import React from 'react'
import LinkList from './LinkList'
import { Collections } from '@/constants/links'

export default function SideBar() {
    return (
        <aside className='sidebar flex-shrink-0 min-w-[300px] bg-white rounded-md mb-10 py-10 px-7 '>
            <div className='sticky top-10'>
                <LinkList
                    linksList={Collections}
                    title='CATEGORIES'
                    titleStyle='text-secondaryColor font-bold pb-2 border-b-2 border-secondaryColor mb-4'
                    linkStyle='text-blackColor2 '
                />
            </div>
        </aside>
    )
}
