import { Post } from "../../types/Post";

export function SimpleSearch(
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