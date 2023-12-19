import UserModel from "../schemas/User";
import { Request, Response } from "express";
import {sign} from "jsonwebtoken";

const signToken = (id: string) => {
    return sign({ id }, process.env.ACCESS_TOKEN_SECRET_KEY, {
        expiresIn: process.env.EXPiRES_TOKEN_DATE
    })
}

export const register = async (req: Request, res: Response) => {
    try {
        const { userName, email, password } = req.body

        const emailExist = await UserModel.findOne({ email })

        if (emailExist) {
            res.status(201).json({ status: 'email already Exist' })
        } else {
            const newUser = await UserModel.create({ userName, email, password })
            const token = signToken(newUser._id)
            res.status(201).json({ data: { newUser }, token, status: 'user register success' })
        }

    } catch (error) {
        res.status(500).json(error)

    }
}


export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(404).json({ status: 'please provide a valid email amd password' })
    }

    const user = await UserModel.findOne({ email }).select('+password')
    if (!user || !(await user.correctPassword(password, user.password))) {
        return res.status(404).json({ status: 'invalid email or password' })
    }

    const token = signToken(user._id)
    res.status(200).json({ status: 'success', token })
}