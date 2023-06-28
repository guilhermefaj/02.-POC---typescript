import { Router } from "express";
import bookRouter from "./books.routes";


const router = Router();
router.use(bookRouter);

export default router;