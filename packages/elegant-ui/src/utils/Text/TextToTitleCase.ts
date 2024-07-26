/**
 * Input a normal string, and return it title cased.
 * @param str A simple string.
 * @returns A title case string.
 */
export default function TextToTitleCase(str: string) {
    return str.replace(/(?:^|-)([a-z])/gi, (m, p1) => ` ${p1.toUpperCase()}`).trim();
};