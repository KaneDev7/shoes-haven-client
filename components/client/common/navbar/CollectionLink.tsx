import React from 'react'
import { IoChevronDownSharp } from "react-icons/io5";
import MegaMenu from '../../navbar/MegaMenu';
import PopOverProvider from '@/context/PopOverProvider';
import PopOverTrigger from './popOver/PopOverTrigger';
import PopOverContent from './popOver/PopOverContent';

export default function CollectionLink() {
    return (
        <PopOverProvider spaceY={60}>
            <PopOverTrigger>
                <div className='flex gap-2 py-3 cursor-pointer '>
                    <p>COLLECTIONS</p>
                    <IoChevronDownSharp size={15} />
                </div>
            </PopOverTrigger>
            <PopOverContent >
                <MegaMenu />
            </PopOverContent>
        </PopOverProvider>
    )
}
