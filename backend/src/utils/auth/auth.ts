import bcrypt from 'bcrypt';
import { generateToken } from '../../jwt/auth';
import { Request, Response } from 'express';
import { Model } from 'mongoose';
import TokensModal from '../../schemas/Token';
import BaseDocument from '../../types/UserAndRegisrationMethodeTypes'

export const registerEntity = async <T extends BaseDocument>(
    req: Request,
    res: Response,
    model: Model<T>
): Promise<void> => {
    try {
        const { userName, email, password } = req.body;
        const findEmail = await model.findOne({ email });
        if (!findEmail) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await model.create({ userName, email, password: hashedPassword });
            res.status(201).json({ newUser, message: "user registration successful" });
        } else {
            res.status(400).json({ message: "Email already exists" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Registration failed" });
    }
};

export const loginUser = async <T extends BaseDocument>(req: Request, res: Response, userModel: Model<T>) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });

        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                const token = generateToken({ email: user.email, _id: user._id })

                const tokenHaveUserId = await TokensModal.findOne({userId: user._id})

                if (!tokenHaveUserId) {
                    await TokensModal.create({ userId: user._id, token})
                }
                res.status(200).json({ massage: "user login successfully", token });
            } else {
                res.status(401).json({ message: 'Authentication failed' });
            }
        } else {
            res.status(401).json({ message: 'Authentication failed' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};