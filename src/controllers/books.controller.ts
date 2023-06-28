import { CreateBook } from "@/protocols/book.protocol";
import { Request, Response } from "express";
import httpStatus from "http-status";
import * as booksRepository from "../repositories/books.repository"

export async function registerBook(req: Request, res: Response) {
    const newBook = req.body as CreateBook;


    res.status(httpStatus.CREATED).send(`Livro registrado!`)
};

export async function getBooks(req: Request, res: Response) {
    const books = booksRepository.getBooks

    res.status(httpStatus.OK).send(books);
};