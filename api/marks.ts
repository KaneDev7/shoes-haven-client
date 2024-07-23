import instanceAxios from "@/lib/axios"

export const addMark= async (formData: FormData, token: string): Promise<any> => {
    try {
        const response = await instanceAxios.post('/marks/add',
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

export const updateMark = async (formData: FormData, token: string, id : string): Promise<any> => {
    try {
        const response = await instanceAxios.put(`/marks/${id}`,
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


export const getMarks = async (): Promise<any> => {
    try {
        const response = await instanceAxios.get('/marks',)
        return response.data.data

    } catch (error) {
        console.log(error)
        return error
    }
}


export const deleteMark= async (token : string, id: string): Promise<any> => {
    try {
        const response = await instanceAxios.delete(`/marks/${id}`,
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
