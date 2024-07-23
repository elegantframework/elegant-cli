'use server'

import { Collection } from "@/components/Types";
import prisma from "@/utils/Prisma";

export interface CreatePost {
    id: string;
    title: string;
    status: "DRAFT" | "PUBLISHED";
    description: string;
    coverImage: string;
    content: string;
    authorId: string;
    slug: string;
    collection: Collection;
    tags: string[];
    publishedAt: Date
};

export async function createPost(post: CreatePost) {
    try {
        const response = await prisma.post.upsert({
            where: {
                id: post.id,
                collections: {
                    some: {
                        id: post.collection.id
                    }
                }
            },
            create: {
                title: post.title,
                status: post.status,
                description: post.description,
                coverImage: post.coverImage,
                content: post.content,
                authorId: post.authorId,
                slug: post.slug,
                collections: {
                    connect: {
                        id: post.collection.id,
                    }
                },
                tags: post.tags,
                publishedAt: post.publishedAt
            },
            update: {
                title: post.title,
                status: post.status,
                description: post.description,
                coverImage: post.coverImage,
                content: post.content,
                authorId: post.authorId,
                slug: post.slug,
                collections: {
                    connect: {
                        id: post.collection.id,
                    }
                },
                tags: post.tags,
                publishedAt: post.publishedAt
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

export async function getPostBySlug(slug: string, collection: string) {
    const response = await prisma.post.findFirst({
        select: {
            id: true,
            title: true,
            status: true,
            description: true,
            coverImage: true,
            content: true,
            slug: true,
            tags: true,
            publishedAt: true,
            author: {
                select: {
                    name: true,
                    image: true
                }
            }
        },
        where: {
            slug: slug,
            collections: {
                some: {
                    title: collection.toLowerCase()
                }
            }
        }   
    });

    return response;
}

export async function getAllPostsForCollection(name: string) {
    const response = await prisma.post.findMany({
        where: {
            collections: {
                some: {
                    title: name
                }
            }
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