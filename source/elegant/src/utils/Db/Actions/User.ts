'use server'

import prisma from "@/utils/Prisma";

export interface CreateUser {

};

export async function createUser(user: CreateUser) {
    try {
        const response = await prisma.user.create({
            data: user
        });

        return response;
    } 
    catch (error: any) {
        return {
            error: error.message,
        };
    }
}

export interface GetUserById {
    id: string;
}

export async function getUsertById(user: GetUserById) {
    try {
        const response = await prisma.user.findUnique({
            where: {
                id: user.id,
            }   
        });

        return response;
    } 
    catch (error: any) {
        return {
            error: error.message,
        };
    }
}

export interface UpdateUser {
    id: string;
}

export async function updateUser(user: UpdateUser) {
    try {
        const response = await prisma.user.findFirst({
            where: {
                id: user.id,
            }   
        });

        return response;
    } 
    catch (error: any) {
        return {
            error: error.message,
        };
    }
}