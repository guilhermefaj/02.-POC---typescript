export type Book = {
    id: number;
    title: string;
    author: string;
    release_date?: string | Date;
    price: number
}

export type CreateBook = Omit<Book, "id">;