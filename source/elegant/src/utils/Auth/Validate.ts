/**
 * Validate that a user is authorized for this request.
 * @param email A users email address. "*" represents all.
 * @returns A boolean.
 */
export default function ValidateAuth(email: string) {
    if(email === "*"){
        return true;
    }

    return false;
};