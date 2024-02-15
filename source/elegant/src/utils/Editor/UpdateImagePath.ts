/**
 * Update any image paths to remove the api url from the path.
 * @param content Post content.
 * @param adminImagePath The admin image url path.
 * @param imagePath The image path that admin url path should replaced with.
 * @returns Updated post content without using api image urls.
 */
export default function UpdateImagePath(
    content: string, 
    adminImagePath = "api/admin/images/", 
    imagePath = "images/"
){  
    let result = content.replace(
        `/${adminImagePath}`,
        `/${imagePath}`
      );
    
    return result;
}