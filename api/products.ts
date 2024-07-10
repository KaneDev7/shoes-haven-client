import instanceAxios from "@/lib/axios"
import { Product } from "@/types/product.type"
import { createUrlParams } from "@/utils/commun"

export const getProducts = async (queryObject : any = {}) : Promise<Product[] | any> => {
   const querys =  createUrlParams(queryObject)
    try {
        const response = await instanceAxios.get(`/products?${querys}`)
        return response.data.data

    } catch (error) {
        console.log(error)
        return error
    }
}


export const getSameProducts = async (productId: string) : Promise<Product[] | any> => {
    try {
        const response = await instanceAxios.get(`/products?productId=${productId}`)
        return response.data.data

    } catch (error) {
        console.log(error)
        return error
    }
}

export const getOneProduct = async (productId : string) : Promise<Product | any> => {
    try {
        const response = await instanceAxios.get(`/products/${productId}`)
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