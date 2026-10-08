import type {Request, Response, NextFunction} from "express";
import {register, login} from "../services/auth.service.js";

export async function registerController(
    req: Request,
    res: Response,
    next: NextFunction
){
    try {
        const {name, email, password} = req.body;
        const user = await register(name, email, password);

        res.status(201).json({
            message: "Usuario registrado correctamente",
            user
        });
    } catch (error) {
        next(error);
    }

}

export async function loginController(
    req: Request,
    res: Response,
    next: NextFunction
){
    try {
        const {email, password} = req.body;
        
        const result = await login(email, password);

        res.status(200).json({
            message: "Usuario logueado correctamente",
            ...result
        });

    } catch (error) {
        next(error);
    }

}