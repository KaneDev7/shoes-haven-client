import instanceAxios from "@/lib/axios"

export const createUser = async (formData: FormData): Promise<any> => {
    try {
        const response = await instanceAxios.post('/auth/register',
            formData,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        return response.data

    } catch (error) {
        console.log(error)
        return error
    }
}


export const login = async (formData: FormData): Promise<any> => {
    try {
        const response = await instanceAxios.post('/auth/login',
            formData,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        console.log('dsds',response.data)
        return response.data

    } catch (error) {
        console.log(error)
        return error
    }
}