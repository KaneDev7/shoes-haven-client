import { getCart } from "@/api/cart"

export const updateCart = async (token: string) => {
    const {items, quantity, total} = await getCart(token)
    console.log('cart', {items, quantity, total})
    return {cart : items, quantity, total}
}