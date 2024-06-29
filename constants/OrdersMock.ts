import { Order } from "@/types/product.type";

export const OrdersMock : Order[] = [
    {
        _id : '6660d182d8903cfbf020792e',
        user_id : '665789b1c56e32e4b3e65bbb',
        username : 'Omar kane',
        email : 'omarkane455@gmail.com',
        items : [
            {
                productId : '6679fa564b9cb6f0388b07f6',
                quantity : 2
            },
            {
                productId : '6679fb774b9cb6f0388b07fc',
                quantity : 2
            },
        ],
        order_date : '2024-04-05T22:00:00.000Z',
        payment_method : 'wave',
        status : 'pendding',
        total_price : 25000,
        
    },
    {
        _id : '66587b69ea9f2719d546636d',
        user_id : '6660d182d8903cfbf020792e',
        username : 'Lmine kane',
        email : 'laminekane22@gmail.com',
        items : [
            {
                productId : '667b2cf93da7210065e453c9',
                quantity : 2
            },
            {
                productId : '667f0cf22592423b7e67ca70',
                quantity : 2
            },
        ],
        order_date : '2024-04-05T22:00:00.000Z',
        payment_method : 'wave',
        status : 'deliveried',
        total_price : 25000,
        delivery_date : '2024-04-05T22:00:00.000Z'
    },
]