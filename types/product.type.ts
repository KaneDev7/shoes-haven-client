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

