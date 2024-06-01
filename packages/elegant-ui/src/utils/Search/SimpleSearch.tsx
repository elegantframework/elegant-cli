import { Post } from "../../types/Post";

/**
 * A simple text based search of a group of posts.
 * @param searchValue The search term to find.
 * @param posts The posts to search through.
 * @returns Posts that match the search text.
 */
export default function SimpleSearch(
    searchValue: string,
    posts: Post[]
) {
    const resultPosts = posts.filter(({ 
        title, 
        description, 
        tags 
    }) => {
        if(!tags){
            tags = [];
        };

        const searchContent = `${title} - ${description} - ${tags.join(' ')}`;
        
        return searchContent.toLowerCase().includes(searchValue.toLowerCase());
    });

    return resultPosts;
}