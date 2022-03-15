export type Post = {
    id: number,
    date: string,
    title: {rendered: string}
    content: {rendered: string, protected: boolean},
    author: number,
    tags: number[],
    categories: number[],
    excerpt:{rendered: string}
}