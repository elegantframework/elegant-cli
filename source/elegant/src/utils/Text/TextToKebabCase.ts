/**
 * Capitalize the first letter of every word in a string.    
 * @param str A normal string.
 * @returns A kebab cased string.
 */
const TextToKebabCase = (str: string) => {
    const words = str.split(" ");

    return words.map((word) => { 
        return word[0].toUpperCase() + word.substring(1); 
    }).join(" ");
};

export default TextToKebabCase;