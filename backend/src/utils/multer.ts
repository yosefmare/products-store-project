import multer, {StorageEngine, Multer} from 'multer'
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

export default upload