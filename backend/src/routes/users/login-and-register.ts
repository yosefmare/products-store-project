import { Router } from "express";
import { login, register } from "../../utils/auth";
import { upload } from "../../file-managment/multer";

const router = Router()
router
    .post('/auth/login', upload.none(), login)
    .post('/auth/register', upload.none(), register)

export default router