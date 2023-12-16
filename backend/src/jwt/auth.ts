import { verify, sign, JwtPayload } from 'jsonwebtoken';
import { Request, Response } from 'express';
import { BaseDocument } from '../types/UserAndRegisrationMethodeTypes';
import UserModel from '../schemas/User';

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


const authenticateAndSendToken = async (req: Request, res: Response, next: () => {}) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (token) {
        try {
            const decoded = verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);

            if (typeof decoded === 'string') {
                // Handle the case where the token is a string (unlikely in this context)
                console.error('Unexpected token format: token is a string');
            } else {
                // At this point, 'decoded' is recognized as JwtPayload
                const user = await UserModel.findOne({ _id: decoded._id, email: decoded.email });

                if (user) {
                    // Token is valid, add it to the response headers
                    res.header('Authorization', `Bearer ${token}`);
                }
            }
        } catch (error) {
            // Token verification failed, you can handle this case accordingly
            console.error(error);
        }
    }

    next();
};

export { auth, generateToken, authenticateAndSendToken };
