import { Book, CreateBook } from "@/protocols/book.protocol";
import * as booksRepository from "../repositories/books.repository"

async function existingBook(book: CreateBook) {
    try {
        const existingBooks = await booksRepository.getBook(book.title);
        console.log(existingBooks.length)
        if (existingBooks.length > 0) {
            throw {
                type: "bookAlreadyExists",
                message: "This book is already registered"
            };
        }

        return booksRepository.registerBook(book);
    } catch (err) {
        throw new Error("Failed to check existing book: " + err.message);
    }
}


async function deleteBook(id: number) {
    const existingBookId = await booksRepository.getBookById(id);

    if (!(existingBookId.length > 0)) {
        throw {
            type: "bookDoesnExists",
            message: "This id doesn't exist"
        }
    }

    return booksRepository.deleteBook(id);
}

async function updateBook(id: number, book: CreateBook) {
    const existingBook = await booksRepository.getBookById(id);

    if (existingBook.length === 0) {
        throw {
            type: "bookDoesnExists",
            message: "This id doesn't exist"
        }
    }

    return booksRepository.updateBook(id, book);
}


const booksServices = {
    existingBook,
    deleteBook,
    updateBook
};

export default booksServices;