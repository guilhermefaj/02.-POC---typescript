import { CreateBook } from "@/protocols/book.protocol";
import * as booksRepository from "../repositories/books.repository"

async function existingBook(book: CreateBook) {
    const existingBooks = await booksRepository.getBook(book.title);

    if (existingBooks.length > 0) {
        throw {
            type: "bookAlreadyExists",
            message: "This book is registered already"
        }
    }

    return booksRepository.registerBook(book)
};



const booksServices = {
    existingBook
};

export default booksServices;