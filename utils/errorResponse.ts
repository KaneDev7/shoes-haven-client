
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
  
    if(errorObjetc?.response?.status === 500){
        return {
            error : true, 
            message: 'Une erreur est survenue ressayer ultérieurement'}
    }
 
    return {error : false}
}