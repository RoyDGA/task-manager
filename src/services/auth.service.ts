import { findUserByEmail, createUser } from "../persistence/user.repository.js";
import bcrypt from "bcrypt";

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