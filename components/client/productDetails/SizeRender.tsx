import { SIZES_DATA } from '@/constants/data'
import React from 'react'

type SizeRenderType = {
    ProductSize: string,
    selectSize: string
    onSelectSizeChange: (size: string) => void
}
export default function SizeRender({ ProductSize, selectSize, onSelectSizeChange }: SizeRenderType) {
    const ProductSizeArr = ProductSize?.split(',')
    const isSizeMatch = (size: number) => {
        return ProductSizeArr.map(item => item.trim()).includes(size.toString())
    }
    return <div className='flex flex-col gap-4 pb-6 border-b'>
        <h2 className='text-[18px] font-semibold'>Selectionnez une Taille</h2>
        <div className='flex gap-2 flex-wrap'>
            {
                SIZES_DATA.map((size) => (
                    <div
                        onClick={() => onSelectSizeChange(size)}
                        className={`w-[50px] h-[40px] relative cursor-pointer font-semibold overflow-hidden rounded-lg flex items-center justify-center ${!isSizeMatch(size) && 'pointer-events-none opacity-70'} ${Number(selectSize) === size ? 'bg-secondaryColor' : 'bg-gray-100'}   text-blackColor2`} >
                        {size}
                        {
                            !isSizeMatch(size) &&
                            <span className='h-[200%] w-[1px] bg-black opacity-30 absolute right-0 rotate-[50deg] origin-top-right top-0 '></span>
                        }
                    </div>
                ))
            }
        </div>
    </div>

}



