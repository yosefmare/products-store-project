import multer, { StorageEngine, Multer } from 'multer'
import { BaseDocument } from 'types/UserAndRegisrationMethodeTypes'
import { verifyToken } from '../utils/auth'
import { Request, Response } from 'express'
import { Model } from 'mongoose'
import os from 'os'
import path from 'path'

const storage: StorageEngine = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../frontend/produts-stroe/public')
    },
    filename: function (req, file, cb) {
        const fileName = `${Date.now()}_${file.originalname}`
        cb(null, fileName)
    }
})

const upload: Multer = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only JPEG and PNG are allowed.'));
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 5, // 5 MB
    },
})


const setImageProfile = async (req: Request, res: Response, model: Model<BaseDocument>) => {
    try {
        const userId = await verifyToken(req);

        if (userId) {
            // Remove the "public" prefix from the file path
            // Detect the operating system
            const userOS = os.platform(); // Returns 'darwin' for macOS, 'win32' for Windows, etc.

            let publicPath: string;

            // Adjust the publicPath based on the user's system
            if (userOS === 'win32') {
                publicPath = path.normalize('..\\frontend\\produts-stroe\\public\\');
            } else {
                publicPath = path.normalize('frontend/produts-stroe/public/');
            }

            // Normalize the file path and remove the "public" prefix
            const filePath = path.normalize(req.file.path);
            const filePathWithoutPublic = filePath.replace(publicPath, '');

            const user = await model.findOneAndUpdate(
                { _id: userId.id },
                { $set: { profileImg: filePathWithoutPublic } },
                { new: true }
            );

            res.json({ message: 'Profile image uploaded successfully', user });
        } else {
            res.status(401).json({ message: 'Unauthorized' });
        }
    } catch (error) {
        res.json({ message: 'Profile image upload failed', error });
    }
}

export { upload, setImageProfile }