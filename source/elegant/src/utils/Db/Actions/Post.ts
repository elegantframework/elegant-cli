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

export interface GetPostByTitle {
    name: string;
}

export async function getPostByTitle(post: GetPostByTitle) {
    try {
        const response = await prisma.post.findFirst({
            where: {
                title: post.name,
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