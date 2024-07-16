import React, { useState } from 'react'
import { MdError } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";

type ModalType = {
    children: React.ReactNode,
    title: string
    status?: 'success' | 'error',
    onChowModal: () => void
}

export default function Modal({ children, title, status }: ModalType) {
    const [showModal, setShowModal] = useState(true)

    if(showModal)
    return (
        <div className='flex inset-0 z-20 items-center justify-center w-screen h-screen bg-black/50  fixed'>
            <div className='bg-white max-w-[450px] rounded-md '>
                <header className='flex items-center justify-between px-4 py-5 border-b border-gray-400 '>
                    <div className='flex items-center gap-2'>
                        <h1 className=' font-semibold text-2xl'>{title} </h1>
                        {status === 'error' ? <MdError color='red' size={20} /> : <FaCheckCircle color='green' size={20} />}
                    </div>
                    <IoMdCloseCircle  size={30} 
                    className='text-gray-300 hover:text-gray-400'
                    onClick={() => setShowModal(false)} />
                </header>
                <div className='p-6'>
                    {children}
                </div>
            </div>

        </div>
    )
}
