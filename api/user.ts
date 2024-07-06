import instanceAxios from "@/lib/axios"
import { User } from "@/types/user.type"

export const getUser = async (token : string) : Promise<User | any> => {
    try {
        const response = await instanceAxios.get('/users/me',
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
