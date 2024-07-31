import { Response } from 'express';

export const handleError = (res: Response, err: unknown) => {
    if (err instanceof Error) {
        return res.status(400).json({ error: err.message });
    }
    return res.status(400).json({ error: 'Erro desconhecido' });
};
