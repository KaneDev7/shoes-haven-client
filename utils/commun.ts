import { DetailedHTMLProps, ImgHTMLAttributes, SyntheticEvent } from "react"

export const troncText = (text: string, length: number) => {
    if (text.length > length) {
        return text.substring(0, length) + '...'
    }
    return text
}
