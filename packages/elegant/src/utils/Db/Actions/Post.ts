'use server'

import { Collection } from "@/components/Types";
import { auth } from "@/utils/Auth/Auth";
import prisma from "@/utils/Db/Prisma";
import { revalidateTag, unstable_cache, unstable_noStore as noStore } from "next/cache";
import pluralize from "pluralize";

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

    try {
        const response = await prisma.post.upsert({
            where: {
                id: post.id,
                siteId: siteId?.activeSiteId,
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
                site: {
                    connect: {
                        id: siteId?.activeSiteId
                    }
                },
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
                site: {
                    connect: {
                        id: siteId?.activeSiteId
                    }
                },
                publishedAt: post.publishedAt
            }
        });

        await revalidateTag(
            `${siteId?.activeSiteId}-${post.collection.title.toLowerCase()}-${post.slug}`,
        );
        await revalidateTag(
            `${siteId?.activeSiteId}-${pluralize(
                post.collection.title.toLowerCase()
            )}`,
        );

        return response;
    } 
    catch (error: any) {
        return {
            error: error.message,
        };
    }
}

export async function getPostBySlug(slug: string, collection: string) {
    if(!process.env.POSTGRES_PRISMA_URL) {
        return null;
    }

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
            siteId: siteId.activeSiteId
        }   
    });

    return response;
}

export async function getPublishedPostBySlug(slug: string, collection: string) {
    if(!process.env.POSTGRES_PRISMA_URL) {
        return null;
    }

    const site = await prisma.site.findFirst({
        where: {
            domain: process.env.NEXT_PUBLIC_APP_URL
        },
    });

    if (!site) {
        return null;
    }

    return await unstable_cache(
        async () => {
            const data = await prisma.post.findFirst({
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
                    status: "PUBLISHED",
                    siteId: site.id
                }   
            });
    
            if (!data) {
                return null;
            }
    
            return data;
        },
        [`${site.id}-${collection.toLowerCase()}-${slug}`],
        {
          revalidate: 900, // 15 minutes
          tags: [`${site.id}-${collection.toLowerCase()}-${slug}`],
        },
      )();
}

export async function getAllPostsForCollection(name: string) {
    if(!process.env.POSTGRES_PRISMA_URL) {
        return null;
    }

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
            siteId: siteId.activeSiteId
        },
        orderBy: [{
            publishedAt: 'desc'
        }]
    });

    return response;
}

export async function getAllPublishedPostsForCollection(name: string) {
    if(!process.env.POSTGRES_PRISMA_URL) {
        return null;
    }

    const site = await prisma.site.findFirst({
        where: {
            domain: process.env.NEXT_PUBLIC_APP_URL
        },
    });

    if (!site) {
        return null;
    }

    return await unstable_cache(
        async () => {
            const data = await prisma.post.findMany({
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
                    status: "PUBLISHED",
                    siteId: site.id
                },
                orderBy: [{
                    publishedAt: 'desc'
                }]
            }); 
    
            if (!data) {
                return null;
            }
    
            return data;
        },
        [`${site.id}-${pluralize(name.toLowerCase())}` ],
        {
          revalidate: 900, // 15 minutes
          tags: [`${site.id}-${pluralize(name.toLowerCase())}`],
        },
    )();
}

export async function getAllPublishedPostsForTag(tag: string, collection: string) {
    if(!process.env.POSTGRES_PRISMA_URL) {
        return null;
    }

    const site = await prisma.site.findFirst({
        where: {
            domain: process.env.NEXT_PUBLIC_APP_URL
        },
    });

    if (!site) {
        return null;
    }

    return await unstable_cache(
        async () => {
            const data = await prisma.post.findMany({
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
                        title: collection
                    },
                    status: "PUBLISHED",
                    siteId: site.id,
                    tags: {
                        has: tag
                    },
                },
                orderBy: [{
                    publishedAt: 'desc'
                }]
            }); 
    
            if (!data) {
                return null;
            }
    
            return data;
        },
        [`${site.id}-${pluralize(collection.toLowerCase())}` ],
        {
          revalidate: 900, // 15 minutes
          tags: [`${site.id}-${pluralize(collection.toLowerCase())}`],
        },
    )();
}

export async function getAllPublishedTagsForCollection(name: string) {
    if(!process.env.POSTGRES_PRISMA_URL) {
        return null;
    }

    const site = await prisma.site.findFirst({
        where: {
            domain: process.env.NEXT_PUBLIC_APP_URL
        },
    });

    if (!site) {
        return null;
    }

    return await unstable_cache(
        async () => {
            const data = await prisma.post.findMany({
                select: {
                    tags: true,
                }, 
                where: {
                    collection: {
                        title: name
                    },
                    status: "PUBLISHED",
                    siteId: site.id
                }
            }); 
    
            if (!data) {
                return null;
            }
    
            return data;
        },
        [`${site.id}-${pluralize(name.toLowerCase())}-tags` ],
        {
          revalidate: 900, // 15 minutes
          tags: [`${site.id}-${pluralize(name.toLowerCase())}-tags`],
        },
      )();
}

export async function getMostRecentPostsForDashboard() {
    if(!process.env.POSTGRES_PRISMA_URL) {
        return null;
    }

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
            authors: true,
            collection: true
        }, 
        where: {
            siteId: siteId.activeSiteId
        },
        orderBy: [{
            updatedAt: 'desc'
        }],
        take: 5
    });

    return response;
}

export async function deletePost(id: string, collection: string) {
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
        const response = await prisma.post.delete({
            where: {
                id: id,
                siteId: siteId.activeSiteId
            }     
        });

        await revalidateTag(
            `${siteId?.activeSiteId}-${pluralize(
                collection.toLowerCase()
            )}`,
        );

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
    if(!process.env.POSTGRES_PRISMA_URL) {
        return null;
    }

    const site = await prisma.site.findFirst({
        where: {
            domain: process.env.NEXT_PUBLIC_APP_URL
        },
    });

    if (!site) {
        return null;
    }

    return await prisma.views.findFirst({
        where: {
          slug: slug,
          siteId: site.id
        },
        select: {
          count: true
        },
    });
}

export async function getAllPageViews()
{
    if(!process.env.POSTGRES_PRISMA_URL) {
        return null;
    }

    const site = await prisma.site.findFirst({
        where: {
            domain: process.env.NEXT_PUBLIC_APP_URL
        },
    });

    if (!site) {
        return null;
    }

    noStore();
    return await prisma.views.findMany({
        select: {
            slug: true,
            count: true
        },
        where: {
            siteId: site.id
        }
    });
}

export async function incrementPageViews(
    slug: string
) {
    if(!process.env.POSTGRES_PRISMA_URL) {
        return null;
    }

    const site = await prisma.site.findFirst({
        where: {
            domain: process.env.NEXT_PUBLIC_APP_URL
        },
    });

    if (!site) {
        return null;
    }
    
    return await prisma.views.upsert({
      where: {
        siteId_slug: {
            slug: slug,
            siteId: site.id
        }
      },
      create: {
        slug: slug,
        siteId: site.id,
        count: 1
      },
      update: {
        count: { increment: 1 }
      },
      select: {
        count: true
      }
    });
}