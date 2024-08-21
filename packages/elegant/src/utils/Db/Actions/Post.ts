'use server'

import { Author, Collection } from "@/components/Types";
import prisma from "@/utils/Prisma";

export interface CreatePost {
    id: string;
    title: string;
    status: "DRAFT" | "PUBLISHED";
    description: string;
    coverImage: string;
    content: string;
    authors: {
        id: string;
    }[];
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
                collection: {
                    id: post.collection.id
                }
            },
            create: {
                title: post.title,
                status: post.status,
                description: post.description,
                coverImage: post.coverImage,
                content: post.content,
                authors: {
                    connect: post.authors.map(a => ({id: a.id}) || [])
                },
                slug: post.slug,
                collection: {
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
                authors: {
                    connect: post.authors.map(a => ({id: a.id}) || [])
                },
                slug: post.slug,
                collection: {
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
            authors: true
        },
        where: {
            slug: slug,
            collection: {
                title: collection.toLowerCase()
            }
        }   
    });

    return response;
}

export async function getPublishedPostBySlug(slug: string, collection: string) {
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
            authors: true
        },
        where: {
            slug: slug,
            collection: {
                title: collection.toLowerCase()
            },
            status: "PUBLISHED"
        }   
    });

    return response;
}

export async function getAllPostsForCollection(name: string) {
    const response = await prisma.post.findMany({
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
            authors: true
        }, 
        where: {
            collection: {
                title: name
            }
        },
        orderBy: [{
            publishedAt: 'desc'
        }]
    });

    return response;
}

export async function getAllPublishedPostsForCollection(name: string) {
    const response = await prisma.post.findMany({
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
            authors: true
        }, 
        where: {
            collection: {
                title: name
            },
            status: "PUBLISHED"
        },
        orderBy: [{
            publishedAt: 'desc'
        }]
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

export async function deletePost(id: string) {
    try {
        const response = await prisma.post.delete({
            where: {
                id: id,
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

export async function getPageViews(
    slug: string
){
    return await prisma.views.findFirst({
        where: {
          slug: slug,
        },
        select: {
          count: true
        },
    });
}

export async function getAllPageViews()
{
    return await prisma.views.findMany({
        select: {
            slug: true,
            count: true
        }
    });
}

export async function incrementPageViews(
    slug: string
) {
    await prisma.views.upsert({
      where: {
        slug: slug
      },
      create: {
        slug: slug,
        count: 1
      },
      update: {
        count: { increment: 1 }
      }
    });
}