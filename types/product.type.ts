export interface Product {
    _id: string,
    productId: string
    title: string
    description: string,
    category: string,
    price: number,
    onStock: boolean,
    size: number,
    color: string,
    mark: string,
    uri: string[],
    __v?: number
}

