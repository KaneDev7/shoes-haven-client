import instanceAxios from "@/lib/axios"

export const updateOrder = async (data : {orderId : string, status : string}, token : string) : Promise<any> => {
    try {
        const response = await instanceAxios.put(`/orders/update/status`,
            data,
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


export const createOrder = async (data : any, token : string) : Promise<any> => {
    try {
        const response = await instanceAxios.post(`/orders`,
            data,
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

export const getOrders = async (token : string) : Promise<Product[] | any> => {
    try {
        const response = await instanceAxios.get(`/orders`,
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

export const getOrdersForCurrentUser = async (token : string) : Promise<Product[] | any> => {
    try {
        const response = await instanceAxios.get(`/orders/user/me`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }
        )
        
        console.log('response', response)
        return response.data.data

    } catch (error) {
        console.log(error)
        return error
    }
}


export const getOneOrder = async (token : string, id :string) : Promise<Product[] | any> => {
    try {
        const response = await instanceAxios.get(`/orders/${id}`,
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

export const DeleteOrder = async (id : string , token : string) : Promise<Product[] | any> => {
    try {
        const response = await instanceAxios.delete(`/orders/${id} `,
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