import instanceAxios from "@/lib/axios"
import { User } from "@/types/user.type"

export const getUser = async (token: string, userId:string): Promise<User | any> => {
    try {
        const response = await instanceAxios.get(`/users/me/${userId} `,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }
        )
        return response?.data?.data

    } catch (error) {
        console.log(error)
        return error
    }
}


export const creatUserContactAdress = async (data: any, token: string): Promise<User | any> => {
    try {
        const response = await instanceAxios.put('/users/contact',
            data,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }
        )
        return response?.data

    } catch (error) {
        console.log(error)
        return error
    }
}



