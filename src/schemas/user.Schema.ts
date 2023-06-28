import { CreateBook } from "@/protocols/book.protocol";
import joi from "joi";

export const bookSchema = joi.object<CreateBook>({
    title: joi.string().required(),
    author: joi.string().required(),
    release_date: joi.string(),
    price: joi.number().required()
})