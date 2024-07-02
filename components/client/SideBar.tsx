import React from 'react'
import LinkList from './LinkList'
import { Collections } from '@/constants/links'
import ColorList from './ColorList'
import Sizes from './Sizes'
import RangeSlider from './RangeSlide'

export default function SideBar() {
    return (
        <aside className='sidebar min-w-[350px] bg-white rounded-md mb-10 py-10 px-7  '>
            <div className=' flex lg:flex-col flex-row flex-wrap gap-20 sticky top-10'>
                <div className='w-[300px] '>
                    <LinkList
                        linksList={Collections}
                        title='CATEGORIES'
                        linkStyle='text-blackColor2'
                        titleStyle='mb-5'
                    />
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
