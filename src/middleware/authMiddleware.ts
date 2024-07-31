import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(403).json({ message: 'Acesso negado! token invalido!.' });
    }

    const decoded = verifyToken(token);

    if (!decoded) {
        return res.status(403).json({ message: 'Token Invalido.' });
    }

    (req as any).user = decoded;
    next();
};
