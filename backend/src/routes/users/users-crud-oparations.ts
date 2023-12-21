import { Router } from "express";
import { updateEntity, getAllEntities } from "../../utils/utils";
import UserModel from "../../schemas/Users";
import { Request, Response } from 'express'
import upload from "../../utils/multer";
import { verifyToken } from '../../utils/auth'

class UsersCrudOperations {
    router: Router;
    constructor() {
        this.router = Router()
        this.router.post('/user/uploadProfileImage', upload.single('file'), this.setImageProfile)
        this.router.get('/users', (req: Request, res: Response) => getAllEntities(req, res, UserModel))
        this.router.patch('/user/editProfile/:id', (req: Request, res: Response) => updateEntity(req, res, UserModel))
    }

    private async setImageProfile(req: Request, res: Response) {
        try {
            const userId = await verifyToken(req);

            if (userId) {
                // Remove the "public" prefix from the file path
                const filePathWithoutPublic = req.file.path.replace('public\\', '');

                const data = await UserModel.findOneAndUpdate(
                    { _id: userId.id },
                    { $set: { profileImg: filePathWithoutPublic } },
                    { new: true }
                );

                res.json({ status: 'Profile image uploaded successfully', data });
            } else {
                res.status(401).json({ status: 'Unauthorized' });
            }
        } catch (error) {
            res.json({ status: 'Profile image upload failed', error });
        }
    }

}

export default UsersCrudOperations