import React from 'react'
import ColorList from './ColorList'
import Sizes from './Sizes'
import RangeSlider from './RangeSlide'
import MarkList from './markList'
import CategoriesList from './CategoriesList'

export default function SideBar() {

    return (
        <aside className='sidebar lg:max-w-[300px]  rounded-md mb-10 py-10 px-7 lg:sticky static top-0 '>
            <div className=' flex lg:flex-col flex-row flex-wrap gap-10 '>
                <CategoriesList />
                <ColorList />
                <Sizes style='gap-4' />
                <MarkList />
                <RangeSlider />
            </div>
        </aside>
    )
}
