/**
 * Should we display the Next button?
 * @param currentPage The currently active page number.
 * @param totalPosts The total number of posts.
 * @param perPage The total posts per page.
 * @returns a boolean representing if the next button should be visible or not.
 */
export function ShowNextButton(
    currentPage: number,
    totalPosts: number,
    perPage: number
){
    if(currentPage < Math.ceil(totalPosts / perPage)) {
        return true;
    }
}

/**
 * Get an ordered list of the pages to be displayed.
 * @param totalPosts The total number of posts.
 * @param perPage The total posts per page.
 * @returns A list of pages, which may include ellipses if the list is too long.
 */
export function GetPageList(   
    totalPosts: number,
    perPage: number
){
    let list = [];

    for(let i = 0; i < Math.ceil(totalPosts / perPage); i++){
        list.push(
            (i + 1).toString()
        )
    }

    return list;
}