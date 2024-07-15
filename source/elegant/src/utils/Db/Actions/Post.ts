'use server'

import prisma from "@/utils/Prisma";

export interface CreatePost {
    title: string;
    status: "DRAFT" | "PUBLISHED";
    description: string;
    coverImage: string;
    content: string;
    authorId: string;
    slug: string;
    collection: string;
    tags: string[];
};

export async function createPost(post: CreatePost) {
    try {
        const response = await prisma.post.create({
            data: post
        });

        return response;
    } 
    catch (error: any) {
        return {
            error: error.message,
        };
    }
}

export interface GetPostById {
    id: string;
}

export async function getPostById(post: GetPostById) {
    try {
        const response = await prisma.post.findUnique({
            where: {
                id: post.id,
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

export async function getPostByTitle(name: string) {
    try {
        const response = await prisma.post.findFirst({
            where: {
                title: name,
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

export interface GetAllPostsForCollection {
    name: string;
};

export async function getAllPostsForCollection(name: string) {
    const response = await prisma.post.findMany({
        where: {
            title: name
        }
    });

    return response;
}

export interface UpdatePost {
    id: string;
}

export async function updatePost(post: UpdatePost) {
    try {
        const response = await prisma.post.findFirst({
            where: {
                id: post.id,
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

export interface DeletePost {
    id: string;
}

export async function deletePost(post: DeletePost) {
    try {
        const response = await prisma.post.delete({
            where: {
                id: post.id,
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