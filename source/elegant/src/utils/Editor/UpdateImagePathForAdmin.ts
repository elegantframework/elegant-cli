/**
 * Update any image paths to include the admin api url image path.
 * @param content Post content.
 * @param imagePath The image path that admin url path should replaced with.   
 * @param adminImagePath The admin image url path.
 * @returns Updated post content using the api image urls.
 */
export default function UpdateImagePathForAdmin(
    content: string, 
    imagePath = "images/",
    adminImagePath = "api/admin/images/"
){  
    let result = content.replace(
        `/${imagePath}`,
        `/${adminImagePath}`,
    );

    const regex = /(src=['"])(.*?)(\1)/g;
    const updatedHtml = result.replace(regex, ($0, $1, $2) => `${($2.startsWith(adminImagePath)) ? adminImagePath : $2}$3`);
    
    return updatedHtml;
}