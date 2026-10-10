import { findUserByEmail, createUser } from "../persistence/user.repository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/app-error.js";


export async function register(
    name: string,
    email: string,
    password: string
){
    const existingUser =await findUserByEmail(email);

    if(existingUser){
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = await createUser(name, email, hashedPassword);
    return newUser;
}

export async function login(
    email: string,
    password: string
){
    const user = await findUserByEmail(email);

    console.log("Usuario encontrado: ", Boolean(user));
    console.log("La contraseña no coincide: ", 
        user ? await bcrypt.compare(password, user.password):false
    );

    if(!user){
        throw new AppError("Correo o contraseña incorrecta.", 401);
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if(!passwordMatch){
        throw new AppError("Correo o contraseña incorrecta.", 401);
    }

    const JWT_SECRET = process.env.JWT_SECRET;
    if(!JWT_SECRET){
        throw new Error("JWT secret not configured");
    }

    const token = jwt.sign(
        {userId: user.id},
        JWT_SECRET,
        {expiresIn: "1h"}
    )

    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
        }
    };
}