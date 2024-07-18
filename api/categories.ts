import instanceAxios from "@/lib/axios"

export const addCategory = async (formData: FormData, token: string): Promise<any> => {
    try {
        const response = await instanceAxios.post('/categories/add',
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

export const updateCategory = async (formData: FormData, token: string, id : string): Promise<any> => {
    try {
        const response = await instanceAxios.put(`/categories/${id}`,
            formData,
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


export const getCategories = async (): Promise<any> => {
    try {
        const response = await instanceAxios.get('/categories',)
        return response.data.data

    } catch (error) {
        console.log(error)
        return error
    }
}


export const deleteCategory = async (token : string, id: string): Promise<any> => {
    try {
        const response = await instanceAxios.delete(`/categories/${id}`,
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
