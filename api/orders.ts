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