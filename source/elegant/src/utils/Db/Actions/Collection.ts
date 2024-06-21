'use server'

import prisma from "@/utils/Prisma";

export interface CreateCollection {
    title: string;
    coverImage?: string;
};

export async function createCollection(collection: CreateCollection) {
    try {
        const response = await prisma.collection.create({
            data: collection
        });

        return response;
    } 
    catch (error: any) {
        return {
            error: error.message,
        };
    }
}

export interface GetCollectionByName {
    title: string;
};

export async function getCollectionByName(collection: GetCollectionByName) {
    try {
        const response = await prisma.collection.findFirst({
            where: {
                title: collection.title
            }
        });

        return response;
    } 
    catch (error: any) {
        return {
            error: error.message,
        };
    }
};

export async function getAllCollections() {
    const response = await prisma.collection.findMany({
        select: {
            title: true
        }
    });

    return response;
};

export interface UpdateCollection {
    id: string;
    title: string;
    coverImage: string;
};

export async function updateCollection(collection: UpdateCollection) {
    try {
        const response = await prisma.collection.update({
            where: {
                id: collection.id,
            },
            data: collection
        });

        return response;
    } 
    catch (error: any) {
        return {
            error: error.message,
        };
    }
}

export interface DeleteCollection {
    id: string;
}

export async function deleteCollection(collection: DeleteCollection) {
    try {
        const response = await prisma.collection.delete({
            where: {
                id: collection.id,
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