import { verify, JwtPayload, sign } from 'jsonwebtoken';
import { Request, Response } from 'express';
import BaseDocument from '../types/UserAndRegisrationMethodeTypes';

const auth = (req: Request, res: Response, next: () => void) => {
    const { headers } = req;
    const { password, email, _id }: BaseDocument = req.body;
    const userData = { password, email, _id };
    const token = headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = verify(token, process.env.ACCESS_TOKEN_SECRET_KEY) as JwtPayload;

        // Check token expiration
        if (decoded.exp && Date.now() >= decoded.exp * 1000) {
            return res.status(401).json({ message: 'Token has expired' });
        }

        Object.assign(userData, decoded);
        next();
    } catch (error) {
        console.error(error);
        res.status(403).json({ message: 'Forbidden' });
    }
};

const generateToken = (data: any) => {
    return sign(data, process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: '1m' });
};

export { auth, generateToken };
