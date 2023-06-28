import { getBooks, registerBook } from "@/controllers/books.controller";
import { Router } from "express";


const bookRouter = Router();

bookRouter.get("/books", getBooks);
bookRouter.post("/books", registerBook);

export default bookRouter;