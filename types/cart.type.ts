
export type Cart = {
    user_id: string
    item : CartItem
}

export type CartItem = {
    productId: string,
    quantity: number,
    size : string
}

export type ExpeditionCardType = {
    text: string,
    number?: string
}