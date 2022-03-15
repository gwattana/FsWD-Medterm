export type Comment = {
    id: number,
    post: number,
    author_name: string,
    content: {rendered: string}
}