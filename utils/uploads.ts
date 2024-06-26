import { troncText } from "./commun"

export const createUrl = (files: FileList) => {
    const uris = []
    for (const file of Array.from(files)) {
        const objectURL = URL.createObjectURL(file)
        const name = troncText(file.name, 20)
        uris.push({ uri: objectURL, name })
    }
    return uris
}