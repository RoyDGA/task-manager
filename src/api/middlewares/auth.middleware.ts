import type {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";

export function authMiddleware(
    req: Request, 
    res: Response, 
    next: NextFunction
) {
        const authHeader = req.headers.authorization;

        console.log("authorization recibido: ", JSON.stringify(authHeader));
        if(!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No token provided" });

        }

        const token = authHeader.split(" ")[1];
        if(!token){
            return res.status(401).json({ message: "Invalid token" });
        }

        const jwtSecret = process.env.JWT_SECRET;
        if(!jwtSecret){
            return next(new Error("JWT_SECRET not defined"));
        }

        try{
            const payload = jwt.verify(token, jwtSecret);
            
            if(typeof payload === "string" ||
                typeof payload.userId !== "number" 
            ){
                return res.status(401).json({
                    message: "Invalid token payload"
                });
            }

            res.locals.userId = payload.userId;

            return next();

        } catch{
            return res.status(401).json({
                message: "Invalid or expired token"
            });
        }
}