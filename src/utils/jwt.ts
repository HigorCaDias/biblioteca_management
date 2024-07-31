import jwt, { JwtPayload } from 'jsonwebtoken';
import { randomBytes } from 'crypto';

const SECRET_KEY = randomBytes(64).toString('hex') ;

export const generateToken = (payload: object): string => {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
};

export const verifyToken = (token: string): string | JwtPayload | null => {
    try {
        return jwt.verify(token, SECRET_KEY) as string | JwtPayload;
    } catch (error) {
        return null;
    }
};
