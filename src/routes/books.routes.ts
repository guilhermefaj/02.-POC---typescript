import booksController from "@/controllers/books.controller";
import { Router } from "express";


const bookRouter = Router();

bookRouter.get("/books", booksController.getBooks);
bookRouter.get("/book", booksController.getBook);
bookRouter.post("/book", booksController.registerBook);
bookRouter.delete("/book/:id", booksController.deleteBook);
bookRouter.put("/books/:id", booksController.updateBook);

export default bookRouter;