
type AxiosError = {
    code: string,
    message : string
    name : string 
    response : {
        data : {message : string}
        status: number
        statusText: string
    }

}

export const erorResponseFactory = (errorObjetc : AxiosError) => {
    const okStatus = [500]
    const responsStatus =  errorObjetc?.response?.status

    if(okStatus.includes(responsStatus)){
        return {
            error : true, 
            message: 'Une erreur est survenue ressayer ultérieurement'}
    }
 
    return {error : false}
}