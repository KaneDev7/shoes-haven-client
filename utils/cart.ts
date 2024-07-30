import { getCart } from "@/api/cart"
import { PENDING } from "@/constants/data"
import { CartItem } from "@/types/cart.type"
import { User } from "@/types/user.type"

export const updateCart = async (token: string) => {
    const { items, quantity, total } = await getCart(token)
    return { cart: items, quantity, total }
}

export const checkUserInfosDiff = (currentUser: User, data: any) => {
    const isInfosChanged = !currentUser?.address ||
        currentUser.phoneNum !== data.phoneNum ||
        currentUser?.address?.street !== data.street ||
        currentUser?.address?.city !== data.city
    return isInfosChanged
}

export const addressAndContactObjectFactory = (currentUser: User, data: any) => {
    return {
        user_id: currentUser._id,
        phoneNum: data.phoneNum,
        address: {
            street: data.street,
            city: data.city
        }
    }
}

export const orderObjectFactory = (currentUser: User, {cart, totalPrice}: {cart: CartItem, totalPrice: string}) => {
    return {
        user_id: currentUser._id,
        username: currentUser.username,
        email: currentUser.email,
        items: cart,
        total_price: totalPrice,
        status: PENDING,
        payment_method: 'Cash',
        order_date: Date.now()
    }
}