'use server'

import { auth } from "@/utils/Auth/Auth";
import prisma from "@/utils/Db/Prisma";
import { revalidateTag } from "next/cache";

export interface CreateCollection {
    title: string;
    coverImage?: string;
};

export async function createCollection(collection: CreateCollection) {
    const session = await auth();
    if (!session?.user?.id) {
      return {
        error: "Not authenticated",
      };
    }
    
    try {
        const siteId = await prisma.user.findUnique({
            select: {
                activeSiteId: true
            },
            where: {
                id: session.user.id
            },
        });

        const response = await prisma.collection.create({
            data: {
                title: collection.title,
                coverImage: collection.coverImage,
                siteId: siteId?.activeSiteId
            },
        });
        
        await revalidateTag(
            `${siteId?.activeSiteId}.${process.env.NEXT_PUBLIC_APP_URL || ""}-collections`,
        );

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
    const session = await auth();
    if (!session?.user?.id) {
      return {
        error: "Not authenticated",
      };
    }

    const siteId = await prisma.user.findUnique({
        select: {
            activeSiteId: true,
            id: true
        },
        where: {
            id: session.user?.id
        },
    });

    if (!siteId || siteId.id !== session.user.id) {
        return {
          error: "Collection not found",
        };
    }
    
    try {
        const data = await prisma.collection.findFirst({
            where: {
                title: collection.title,
                siteId: siteId?.activeSiteId
            }
        });

        if (!data) {
            return null;
        }

        return data;
    } 
    catch (error: any) {
        return {
            error: error.message,
        };
    }
};

export async function getAllCollections() {
    const session = await auth();
    if (!session?.user?.id) {
      return null;
    }

    const siteId = await prisma.user.findUnique({
        select: {
            activeSiteId: true,
            id: true
        },
        where: {
            id: session.user?.id
        },
    });

    if (!siteId || siteId.id !== session.user.id) {
        return null;
    }

    return await prisma.collection.findMany({
        select: {
            id: true,
            title: true
        },
        where: {
            siteId: siteId?.activeSiteId
        }
    });
};

export interface UpdateCollection {
    id: string;
    title: string;
    coverImage: string;
};

export async function updateCollection(collection: UpdateCollection) {
    const session = await auth();
    if (!session?.user?.id) {
      return {
        error: "Not authenticated",
      };
    }

    const siteId = await prisma.user.findUnique({
        select: {
            activeSiteId: true,
            id: true
        },
        where: {
            id: session.user?.id
        },
    });

    if (!siteId || siteId.id !== session.user.id) {
        return {
          error: "No collections found",
        };
    }

    try {
        const response = await prisma.collection.update({
            where: {
                id: collection.id,
            },
            data: collection
        });

        await revalidateTag(
            `${siteId?.activeSiteId}.${process.env.NEXT_PUBLIC_APP_URL || ""}-collections`,
        );
        await revalidateTag(
        `${siteId?.activeSiteId}.${process.env.NEXT_PUBLIC_APP_URL || ""}-${collection.id}`,
        );

        return response;
    } 
    catch (error: any) {
        return {
            error: error.message,
        };
    }
}

export async function deleteCollection(id: string) {
    const session = await auth();
    if (!session?.user?.id) {
      return {
        error: "Not authenticated",
      };
    }

    const siteId = await prisma.user.findUnique({
        select: {
            activeSiteId: true,
            id: true
        },
        where: {
            id: session.user?.id
        },
    });

    if (!siteId || siteId.id !== session.user.id) {
        return {
          error: "No collections found",
        };
    }

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