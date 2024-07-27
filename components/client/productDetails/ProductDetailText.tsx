import { Product } from '@/types/product.type'
import React, { useContext, useEffect, useState } from 'react'
import { MdShoppingCart } from "react-icons/md";
import { useSelector } from 'react-redux';
import { User } from '@/types/user.type';
import { CartContext } from '@/context/cartContext';
import { useRouter } from 'next/navigation';

// Toast 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '../../shared/buttons';
import SameProductType from './SameProductType';
import SizeRender from './SizeRender';
import { Cart } from '@/types/cart.type';
import useMutatationHook from '@/hooks/useMutatationHook';
import { ADD_TO_CART, PENDING, SUCCESS } from '@/constants/data';
import QuantityCount from './QuantityCount';


export default function ProductDetailText({ product }: { product: Product }) {

    const [selectSize, setSelectSize] = useState(product?.size?.split(',')[0])
    const currentUser: User = useSelector(state => state.currentUser)
    const { updateTotalPrice } = useContext(CartContext)
    const [quantity, setQuantity] = useState(1)
    const router = useRouter()
    const { mutate: mutateCart, status } = useMutatationHook({ fonctionName: ADD_TO_CART })

    const onSelectSizeChange = (newSelectSize) => {
        setSelectSize(newSelectSize)
    }

    const addQuantity = () => {
        setQuantity(v => v + 1)
    }

    const decreaseQuantity = () => {
        setQuantity(v => v > 1 ? v - 1 : 1)
    }

    const handleAddToPanier = async () => {
        if (!currentUser) return router.push('/login')
        const newCart: Cart = {
            user_id: currentUser._id as string,
            item: {
                productId: product._id,
                quantity,
                size: selectSize
            }
        }
        mutateCart(newCart)
    }

    useEffect(() => {
        if (status === SUCCESS) {
            toast.success("Produit ajouté au panier avec succée", { hideProgressBar: true })
            updateTotalPrice(product?.price * quantity)
        }
    }, [status])

    return (
        <div className='flex-1 text-blackColor2'>
            <ToastContainer />
            <div className='flex flex-col gap-4 text-blackColor2'>
                <h1 className='text-4xl font-extrabold'> {product.title} </h1>
                <h2 className='text-2xl font-semibold'> {product.price?.toLocaleString()} FCFA</h2>
                <div className='flex flex-col gap-4 pb-6 border-b'>
                    <p className='lg:max-w-[80%] w-full '> {product.description} </p>
                </div>

                <SameProductType
                    currentProductId={product._id}
                    productId={product.productId}
                />

                {/* quantity */}
                <QuantityCount
                    addQuantity={addQuantity}
                    decreaseQuantity={decreaseQuantity}
                    quantity={quantity}
                />

                {/* sizes */}
                <SizeRender
                    ProductSize={product?.size}
                    selectSize={selectSize}
                    onSelectSizeChange={onSelectSizeChange}
                />

                <Button
                    isLoading={status === PENDING}
                    text='Ajouter au panier'
                    handleClick={handleAddToPanier}
                    icon={<MdShoppingCart size={30} />}
                    style='h-[60px] lg:w-[70%] flex justify-center items-center gap-2 bg-secondaryColor text-blackColor2 round rounded-md font-bold text-[20px] '
                />
            </div>
        </div>
    )
}
