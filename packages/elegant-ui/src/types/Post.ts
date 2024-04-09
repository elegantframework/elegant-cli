import { Author } from "./Author";

export interface Post {
    /**
     * The title of this post.
     */
    title: string;
    /**
     * The status of the post.
     */
    status?: "draft" | "published"
    /**
     * The description of the post.
     */
    description: string;
    /**
     * The social share image for this post.
     */
    coverImage?: string;
    /**
     * The post content.
     */
    content?: string;
    /**
     * The post's author object.
     */
    author?: Author;
    /**
     * The post's url slug.
     */
    slug?: string;
    /**
     * The date time string of when this post was published.
     */
    publishedAt?: string;
    /**
     * Tags that can be added to posts.
     */
    tags?: string[];
};