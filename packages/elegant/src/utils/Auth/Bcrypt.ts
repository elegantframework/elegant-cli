import bcrypt from 'bcryptjs';

export function hashPassword(
    password: string
) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

export function comparePasswords(
    password: string,
    hash: string
) {
    return bcrypt.compareSync(password, hash);
}