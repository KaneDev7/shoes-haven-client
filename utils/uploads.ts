import { troncText } from "./commun"

export const createUrl = (files: FileList) => {
    const uris = []
    for (const file of Array.from(files)) {
        const objectURL = URL.createObjectURL(file)
        const name = file.name
        uris.push({ uri: objectURL, name })
    }
    return uris
}