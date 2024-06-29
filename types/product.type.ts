export interface Product {
    _id: string,
    productId: string
    title: string
    description: string,
    category: string,
    price: number | null,
    onStock: boolean,
    size: number | null,
    color: string,
    mark: string,
    uri: string[],
    __v?: number
}


export interface Order {
    _id: string,
    user_id: string,
    username : string
    email : string
    items: [
        {
            quantity: number,
            productId: string
        },
        {
            productId: string,
            quantity: 2
        }
    ],
    total_price: number,
    status: Status,
    payment_method: string,
    order_date: string,
    delivery_date? : string
    __v?: 0
}

export  type Status = 'pendding' | 'deliveried' | 'canceled'