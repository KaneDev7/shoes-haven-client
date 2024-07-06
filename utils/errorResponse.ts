
type AxiosError = {
  code: string,
  message: string
  name: string
  response: {
    data: { message: string }
    status: number
    statusText: string
  }

}

export const erorResponseFactory = (errorObjetc: AxiosError) => {
  const okStatus = [500]
  const responsStatus = errorObjetc?.response?.status

  if (okStatus.includes(responsStatus)) {
    return {
      error: true,
      message: 'Une erreur est survenue ressayer ultérieurement'
    }
  }

  return { error: false }
}

export const handleResponseError = (response) => {
  console.log('response', response)

  let result = {
    isError: false,
    message: ''
  };

  if (response.code === 'ERR_NETWORK') {
    result.isError = true;
    result.message = 'Quelques choses s\'est mal passé ressayez ultérieuremnt';
    return result
  }

  if(response.status === 201) return result

  // Vérifie si le statut est différent de 200 OK ou 201 Created (succès pour POST/PUT)
  if (response?.response?.data?.message.length !== 0 &&
    response?.response?.data?.statusCode !== 201

  ) {
    result.isError = true;
    const message =  response?.response?.data?.message
    result.message = Array.isArray(message) ? message[0] : message 
  }


  return result;
};