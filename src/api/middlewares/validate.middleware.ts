import {Ajv} from "ajv";
import addFormatsModule from "ajv-formats";
import type {JSONSchemaType} from "ajv";
import type {RequestHandler} from "express";
import { AppError } from "../../utils/app-error.js";

const addFormats = addFormatsModule.default;

const ajv = new Ajv({allErrors: true});
addFormats(ajv);

export function validateBody<T>(
    schema:JSONSchemaType<T>
): RequestHandler{
    const validate = ajv.compile(schema);

    return(req, _res, next) => {
        if(!validate(req.body)){
            const details = (validate.errors ?? [])
            .map((error) =>{
                const field = error.instancePath || "body";
                return `${field}: ${error.message}`;
            })
            .join("; ");
        
            return next(
                new AppError(`Datos inválidos ${details}`, 400)
            );
        }

        next();
    }
}