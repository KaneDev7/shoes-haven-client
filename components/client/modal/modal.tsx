import React, { useEffect, useState } from 'react'
import { MdError } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";

type ModalType = {
    children: React.ReactNode,
    title: string
    status?: 'success' | 'error',
    isShowModal? : boolean ,
    setIsShowModal? : (value : boolean) => void
}

export default function Modal({ children, title, status, isShowModal,setIsShowModal }: ModalType) {
    const [showModal, setShowModal] = useState<boolean>(true)

    const handelClose = () => {
        setShowModal(false)
        if(setIsShowModal !== undefined){
            setIsShowModal(false)
        }
    }
    useEffect(()=> {
        if(isShowModal !== undefined){
            setShowModal(isShowModal)
        }
    },[isShowModal])

    if(showModal)
    return (
        <div className='flex inset-0 z-20 items-center justify-center w-screen h-screen bg-black/50  fixed'>
            <div className='bg-white rounded-md '>
                <header className='flex items-center justify-between gap-20 px-4 py-5 border-b border-gray-400 '>
                    <div className='flex items-center gap-2 '>
                        <h1 className=' font-semibold text-lg'>{title} </h1>
                        {status === 'error' && <MdError color='red' size={20} />  }
                        {status === 'success' && <FaCheckCircle color='green' size={20} />  }
                    </div>
                    <IoMdCloseCircle  size={30} 
                    className='text-gray-300 hover:text-gray-400'
                    onClick={handelClose} />
                </header>
                <div className='p-6'>
                    {children}
                </div>
            </div>

        </div>
    )
}
