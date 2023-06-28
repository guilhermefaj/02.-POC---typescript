import { connection } from "@/database/database";
import { Book, CreateBook } from "@/protocols/book.protocol";

export async function registerBook(book: CreateBook) {
    return
}

export async function getBooks() {
    const result = await connection.query<Book>(`
    SELECT * FROM books;
    `)

    return result.rows
}