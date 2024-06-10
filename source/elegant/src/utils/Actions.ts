'use server'

import { signIn } from "./Auth";
import { hashPassword } from "./Bcrypt";
import prisma from "./Prisma";

export async function createAdmin(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
        await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: await hashPassword(password),
                role: "admin"
            }
        });

        const response = await signIn('credentials', formData);

        return response;
    } 
    catch (error: any) {
        return {
            error: error.message,
        };
    }
}

export async function getUser(
    email: string
) {
    try {
        const response = await prisma.user.findUnique({
            where: {
                email: email            }
        });

        return response;
    } 
    catch (error: any) {
        return {
            error: error.message,
        };
    }
}

export async function getAdminCount() {
    const response = await prisma.user.findMany({
        where: {
            role: "admin"            
        }
    });

    return response.length;
}