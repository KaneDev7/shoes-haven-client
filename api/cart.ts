import instanceAxios from "@/lib/axios"

export const addToCart = async (formData: any, token :string | undefined): Promise<any> => {
    try {
        const response = await instanceAxios.post('/cart',
            formData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            }
        )
        return response.data


    } catch (error) {
        console.log(error)
        return error
    }
}
