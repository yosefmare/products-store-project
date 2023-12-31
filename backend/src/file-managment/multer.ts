import multer, { StorageEngine, Multer } from 'multer'
import { BaseDocument } from 'types/UserAndRegisrationMethodeTypes'
import { verifyToken } from '../utils/auth'
import { Request, Response } from 'express'
import { Model } from 'mongoose'


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
            const filePathWithoutPublic = req.file.path.replace('..\\frontend\\produts-stroe\\public\\', '');

            const data = await model.findOneAndUpdate(
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

export { upload, setImageProfile }