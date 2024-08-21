'use server'

import { signIn } from "../../Auth";
import { hashPassword } from "../../Bcrypt";
import prisma from "../../Prisma";

export interface createAdmin {
    name: string;
    email: string;
    password: string;
};

export async function createAdmin(user: createAdmin) {
    try {
        await prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: await hashPassword(user.password),
                role: "admin"
            }
        });

        const response = await signIn('credentials', user);

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
    const response = await prisma.user.findUnique({
        where: {
            email: email            
        }
    });

    return response;
}

export async function getAdminCount() {
    const response = await prisma.user.findMany({
        where: {
            role: "admin"            
        }
    });

    return response.length;
}

export interface logUserIn {
    email: string;
    password: string;
};

export async function logUserIn(user: logUserIn) {
    try {
        const response = await signIn('credentials', user);

        return response;
    } 
    catch (error: any) {
        return {
            error: error.message,
        };
    }
}