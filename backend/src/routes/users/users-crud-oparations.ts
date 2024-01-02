import { Router } from "express";
import { updateEntity } from "../../utils/utils";
import UserModel from "../../schemas/Users";
import { Request, Response } from 'express'
import {upload, setImageProfile} from "../../file-managment/multer";

        const router = Router()
        router.post('/users/uploadProfileImage', upload.single('file'), (req:Request, res:Response) =>  setImageProfile(req, res, UserModel))
        router.patch('/users/editProfile/:id', (req: Request, res: Response) => updateEntity(req, res, UserModel))

    


export default router