import booksController from "@/controllers/books.controller";
import { Router } from "express";


const bookRouter = Router();

bookRouter.get("/books", booksController.getBooks);
bookRouter.get("/book", booksController.getBook);
bookRouter.post("/book", booksController.registerBook);

export default bookRouter;