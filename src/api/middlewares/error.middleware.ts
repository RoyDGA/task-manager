import type { ErrorRequestHandler } from "express";
import { AppError } from "../../utils/app-error.js";

export const errorMiddleware: ErrorRequestHandler = (
    error,
    _req,
    res,
    _next
) => {
    if (error instanceof AppError) {
        res.status(error.statusCode).json({
            message: error.message
        });

        return;
    }

    if (
        error instanceof SyntaxError &&
        "status" in error &&
        error.status === 400
    ) {
        res.status(400).json({
            message: "El cuerpo de la petición contiene JSON inválido."
        });
        return;
    }


    res.status(500).json({
        message: "Internal server error"
    });
}