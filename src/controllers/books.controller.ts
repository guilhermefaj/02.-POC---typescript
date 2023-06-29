import { CreateBook } from "@/protocols/book.protocol";
import { Request, Response } from "express";
import httpStatus from "http-status";
import * as booksRepository from "../repositories/books.repository"
import booksServices from "@/services/books.services";

async function registerBook(req: Request, res: Response) {
    try {
        const newBook = req.body as CreateBook;
        booksServices.existingBook(newBook)

        res.status(httpStatus.CREATED).send(`Livro registrado!`)
    } catch (err) {
        res.status(500).send(err.message)
    }
};

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

const booksController = {
    registerBook,
    getBooks,
    getBook
};

export default booksController;