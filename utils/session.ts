import { getUser } from "@/api/user"

export const updateSession = async (token: string) => {
    const userData = await getUser(token)
    sessionStorage.setItem('session', JSON.stringify(userData))
    sessionStorage.setItem(`cart_${userData?._id}`, JSON.stringify(userData?.cart))
    return userData
}

