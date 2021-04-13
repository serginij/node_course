import bcrypt from 'bcrypt';

const saltRounds: number = +(process.env.SALT_ROUNDS || '3');

export const encryptPassword = (password: string) =>
  bcrypt.hash(password, saltRounds);

export const decryptPassword = (hash: string, password: string) =>
  bcrypt.compare(password, hash);
