import { Router } from "express";
import { login, register } from "../../utils/auth";

const router = Router()
router.post('/login', login)
    .post('/register', register)

export default router