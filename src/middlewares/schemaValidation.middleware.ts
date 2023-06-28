import { Request, Response } from "express";
import httpStatus from "http-status";

export function validateSchema(schema) {
    return (req: Request, res: Response, next) {
        const validation = schema.validate(req.body, { abortEarly: false });

        if (validation.error) {
            const errors = validation.error.details ? validation.error.details.map(detail => detail.message) : [validation.error.message];
            return res.status(httpStatus.BAD_REQUEST).send(errors)
        }

        next();
    }
}