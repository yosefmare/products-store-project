import UserModel from "../schemas/Users";
import { Request, Response } from "express";
import { sign, verify } from "jsonwebtoken";
import { protectRoute } from "./utils";

const signToken = (id: string, role: string) => {
    return sign({ id, role }, process.env.ACCESS_TOKEN_SECRET_KEY, {
        expiresIn: process.env.EXPiRES_TOKEN_DATE
    })
}

export const verifyToken = async (req: Request) => {
    let token = null;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization?.split(' ')[1]
        const decodedToken = await verify(token, process.env.ACCESS_TOKEN_SECRET_KEY) as {
            [id: string]: any; userId: string
        };
        return decodedToken
    }

}

export const register = async (req: Request, res: Response) => {
    try {
        const { userName, email, password, role } = req.body
        if (password && email && role && userName) {
            const emailExist = await UserModel.findOne({ email })
            if (emailExist) {
                res.status(400).json({ message: 'email already Exist' })
            } else {
                const user = await UserModel.create({ userName, email, password, role })
                const token = signToken(user._id, user.role)
                user.password = undefined;
                res.status(201).json({ user, token, message: 'user register success' })
            }
        } else {
            res.status(404).json({ message: 'please fill the fields to continue' })
        }

    } catch (error) {
        res.status(500).json(error)
    }
}

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide a valid email and password' });
    }

    const user = await UserModel.findOne({ email }).select('+password');
    
    if (!user || !(await user.correctPassword(password, user.password))) {
        return res.status(404).json({ message: 'Invalid email or password' });
    }

    const token = signToken(user._id, user.role);

    user.password = undefined;

    return res.status(200).json({
        message: 'Success',
        user,
        token,
    });
};


export const protectionRoutesHandler = async (req: Request, res: Response, model: Function) => {
    //     check if the user is admin
    if (req.headers.authorization) {
        const isAdmin = await protectRoute(req, res)
        if (isAdmin) {
            if (isAdmin.role === 'admin') {
                await model()
            } else {
                res.status(401).json({ message: 'User ar not a admin' });
            }
        }
    } else {
        res.status(401).json({ message: 'Unauthorized - Authorization header missing' });
    }
}