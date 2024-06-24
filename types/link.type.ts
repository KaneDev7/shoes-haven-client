import { IconBaseProps } from 'react-icons'

export interface Link {
    title: string,
    href: string,
    iconName?: string
    subRoute? : string[]
}
