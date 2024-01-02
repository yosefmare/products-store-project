import { Router } from "express";
import { login, register } from "../../utils/auth";

const router = Router()
router.post('/auth/login', login)
    .post('/auth/register', register)

export default router