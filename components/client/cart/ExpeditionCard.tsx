import { ExpeditionCardType } from "@/types/cart.type"


export const ExpeditionCard = ({ text, number }: ExpeditionCardType) => {
    return <div className='flex justify-between items-center opacity-60 font-semibold'>
        <div className='flex gap-2 items-center '>
            <span className='w-[13px] h-[13px] bg-black/20 rounded-full'></span>
            <p className=' font-semibold'>{text} </p>
        </div>
        <p>{number && number} </p>
    </div>
}