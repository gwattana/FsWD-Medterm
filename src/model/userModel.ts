
export interface User{
    id: number
    name: string
    url: string
    description: string
    link: string
    slug: Object
    avatar_urls:Avatar
    meta: string[]
    _links: Object
}

interface Avatar  {
    24:string
    48:string
    96:string
}
