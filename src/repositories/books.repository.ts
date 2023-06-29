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

export async function getBookById(id: number) {
    const result = await connection.query(`
    SELECT * FROM books
    WHERE id = $1;
    `, [id])

    return result.rows
}

export async function deleteBook(id: number) {
    try {
        const result = await connection.query(`
        DELETE FROM books
        WHERE id = $1
        RETURNING id;
        `, [id]);

        const deletedBookId = result.rows[0]?.id;

        return deletedBookId;
    } catch (err) {
        throw new Error("Failed to delete book")
    }
}

export async function updateBook(id: number, book: CreateBook) {
    const existingBook = await connection.query<Book>(
        'SELECT * FROM books WHERE id = $1',
        [id]
    );

    if (existingBook.rows.length === 0) {
        throw new Error("This id doesn't exist");
    }

    const originalBook = existingBook.rows[0];

    const updatedBook = {
        title: book.title || originalBook.title,
        author: book.author || originalBook.author,
        release_date: book.release_date || originalBook.release_date,
        price: book.price || originalBook.price
    };

    try {
        const result = await connection.query<Book>(
            `
        UPDATE books
        SET title = $1, author = $2, release_date = $3, price = $4
        WHERE id = $5
        RETURNING id;
        `,
            [updatedBook.title, updatedBook.author, updatedBook.release_date, updatedBook.price, id]
        );

        const updatedBookId = result.rows[0]?.id;
        return updatedBookId;
    } catch (err) {
        throw new Error('Failed to update book');
    }
}
