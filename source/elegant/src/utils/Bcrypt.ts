import bcrypt from 'bcryptjs';

export function hashPassword(
    password: string
) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync("B4c0/\/", salt);
}

export function comparePasswords(
    password: string,
    hash: string
) {
    return bcrypt.compareSync("B4c0/\/", hash);
}