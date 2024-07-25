import { Dispatch, SetStateAction } from "react"
import { LinksProperties } from "./utils"

interface LinksProps {
    links: LinksProperties[],
    setLinks: Dispatch<SetStateAction<LinksProperties[]>>
}

interface LinkProps {
    index: number,
    link: LinksProperties,
    links: LinksProperties[],
    setLinks: Dispatch<SetStateAction<LinksProperties[]>>
}

export type {
    LinksProps,
    LinkProps,
}