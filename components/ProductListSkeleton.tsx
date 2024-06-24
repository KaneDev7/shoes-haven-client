
const SkeletonCard = () => {
    return <li className='col-span-1 bg-white rounded-md relative'>
        <div className='w-full h-full flex flex-col justify-between p-2'>
            <div className="h-[200px] w-full mb-5 bg-skeletonBg animate-pulse  "></div>
            <div className='space-y-2'>
                <div className='h-[10px] w-full bg-skeletonBg rounded-full '>  </div>
                <h2 className='h-[10px] w-full bg-skeletonBg rounded-full'> </h2>
                <p className='h-[10px] w-full bg-skeletonBg  rounded-full'></p>
            </div>
        </div>
    </li>
}

export function ProductListSkeleton() {
    return (
        <>
            <ul className={` w-full  productsPage sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  mt-10 productsGrid grid gap-4`} >
                {Array.from({ length: 20 }).map((_, index) => (
                    <SkeletonCard />
                ))}
            </ul>
        </>
    );
}




