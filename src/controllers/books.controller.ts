import { Book, CreateBook } from "@/protocols/book.protocol";
import { Request, Response } from "express";
import httpStatus from "http-status";
import * as booksRepository from "../repositories/books.repository"
import booksServices from "@/services/books.services";

async function registerBook(req: Request, res: Response) {
    try {
        const newBook = req.body as CreateBook;
        await booksServices.existingBook(newBook);

        res.status(httpStatus.CREATED).send("Registered book!");
    } catch (err) {
        if (err.type === "bookAlreadyExists") {
            res.status(httpStatus.CONFLICT).send(err.message);
        } else {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Failed to register book");
            // FIXME caindo no 500 mesmo no caso que o livro já existe
        }
    }
}


async function getBooks(req: Request, res: Response) {
    try {
        const books = await booksRepository.getBooks();

        res.status(httpStatus.OK).send(books);
    } catch (err) {
        res.status(500).send(err.message)
    }
};

async function getBook(req: Request, res: Response) {
    try {
        const body = req.body as CreateBook;
        const book = await booksRepository.getBook(body.title)
        res.status(httpStatus.OK).send(book)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

async function deleteBook(req: Request, res: Response) {
    const { id } = req.params;
    try {
        const deletedBook = await booksServices.deleteBook(parseInt(id));
        res.status(httpStatus.OK).send(`Deleted!`)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

async function updateBook(req: Request, res: Response) {
    const book = req.body as CreateBook;
    const { id } = req.params;

    try {
        await booksServices.updateBook(parseInt(id), book)
        res.status(200).send("Book updated successfully");
    } catch (err) {
        res.status(500).send(err.message)
    }
}


const booksController = {
    registerBook,
    getBooks,
    getBook,
    deleteBook,
    updateBook
};

export default booksController;