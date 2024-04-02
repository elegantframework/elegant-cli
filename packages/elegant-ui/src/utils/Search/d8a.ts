import { Post } from "../../types/Post";

export function SamplePost() {
    let post: Post = {
        title: "This is a test post",
        status: "published",
        description: "This is the description of the test post.",
        coverImage: "",
        content: "This is a test post for unit testing.",
        author: {
            name: "",
            picture: ""
        },
        slug: "",
        publishedAt: "",
        tags: ["Hello", "World"]
    };

    return post;
}