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
            id: true,
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

export async function deleteCollection(id: string) {
    try {
        const documentsToBeDeleted = prisma.post.deleteMany({
            where: {
              collectionId: id,
            }
        });
        
        const collectionToDelete = prisma.collection.delete({
            where: {
              id: id,
            }
        });
        
        const response = await prisma.$transaction([ documentsToBeDeleted, collectionToDelete ]);

        return response;
    } 
    catch (error: any) {
        return {
            error: error.message,
        };
    }
}