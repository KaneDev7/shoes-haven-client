
export type CartItem = {
    productId: string,
    quantity: number,
}

export interface User {
    _id?: string,
    username: string,
    password: string,
    email: string,
    role?: string,
    isActive?: true,
    cart?: CartItem[],
    isNew?: boolean
    __v?: 0,
    token?: string,
    address?: {
        street: "u.10",
        city: "Keur Massar",
        _id: string
    },
    phoneNum?: string
}