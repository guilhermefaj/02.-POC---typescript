import { connection } from "@/database/database";
import { Book, CreateBook } from "@/protocols/book.protocol";

export async function registerBook(book: CreateBook) {
    const { title, author, release_date, price } = book;

    try {
        const result = await connection.query<CreateBook>(`
        INSERT INTO books (title, author, release_date, price)
        VALUES ($1, $2, $3, $4)
        RETURNING id, title, author, release_date, price;
        `, [title, author, release_date, price])

        const newBook = result.rows[0];

        return newBook;

    } catch (err) {
        throw new Error("Failed to register book")
    }
}

export async function getBooks() {
    const result = await connection.query<Book>(`
    SELECT * FROM books;
    `)

    return result.rows
}

export async function getBook(title: string) {
    const result = await connection.query<Book>(`
    SELECT * FROM books
    WHERE title = $1;
    `, [title])

    return result.rows
}