import instanceAxios from "@/lib/axios"
import { Product } from "@/types/product.type"

export const getProducts = async (token : string) : Promise<Product[] | any> => {
    try {
        const response = await instanceAxios.get('/products',
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }
        )
        return response.data.data

    } catch (error) {
        console.log(error)
        return error
    }
}


export const getSameProducts = async (token : string, productId: string) : Promise<Product[] | any> => {
    try {
        const response = await instanceAxios.get(`/products?productId=${productId} `,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }
        )
        return response.data.data

    } catch (error) {
        console.log(error)
        return error
    }
}

export const getOneProduct = async (token : string, productId : string) : Promise<Product | any> => {
    try {
        const response = await instanceAxios.get(`/products/${productId}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }
        )
        return response.data.data

    } catch (error) {
        console.log(error)
        return error
    }
}



export const addProduct = async (formData : FormData, token : string) : Promise<any> => {
    try {
        const response = await instanceAxios.post('/products/add',
            formData,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
        return response

    } catch (error) {
        console.log(error)
        return error
    }
}


export const updateProduct = async (formData : FormData, token : string, productId :string) : Promise<any> => {
    try {
        const response = await instanceAxios.put(`/products/update/${productId}`,
            formData,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
        return response

    } catch (error) {
        console.log(error)
        return error
    }
}

export const deleteProduct = async (token : string, productId :string) : Promise<any> => {
    try {
        const response = await instanceAxios.delete(`/products/delete/${productId}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }
        )
        return response

    } catch (error) {
        console.log(error)
        return error
    }
}


export const toggleStock = async (token : string, productId :string, statut : boolean | undefined) : Promise<any> => {
    try {
        const response = await instanceAxios.put(`/products/update/stock/${productId}`,
        {onStock : statut},   
        {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }
        )
        return response

    } catch (error) {
        console.log(error)
        return error
    }
}