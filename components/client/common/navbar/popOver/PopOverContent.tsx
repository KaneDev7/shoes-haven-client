import { PopOverContext } from "@/context/PopOverProvider";
import { ReactNode, useContext } from "react";


export default function PopOverContent({ children}: { children: ReactNode }) {
    const { showContent, setIsMonseInContent, spaceY } = useContext(PopOverContext)

    const handleMonseInTheContent = () => {
        setIsMonseInContent(true)
    }

    const handleMonseOutTheContent = () => {
        setIsMonseInContent(false)
    }

    if (showContent)
        return (
            <div
                onMouseEnter={handleMonseInTheContent}
                onMouseLeave={handleMonseOutTheContent}
                className={` absolute top-[${spaceY}px] left-[50%] translate-x-[-50%] translate-y-[50px]  z-[10]  transAnime`}>
                {children}
            </div>
        )
}
