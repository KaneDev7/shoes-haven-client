import { DetailedHTMLProps, ImgHTMLAttributes, SyntheticEvent } from "react"

export const troncText = (text: string, length: number) => {
    if (text.length > length) {
        return text.substring(0, length) + '...'
    }
    return text
}


export const createUrlParams = (queryObject: { [key: string]: string }) => {
    let url = new URL(`http://localhost:3000`);
    let params = new URLSearchParams(url.search);
    for (const [key, value] of Object.entries(queryObject)) {
        params.append(key, value)
    }
    return params.toString()
}