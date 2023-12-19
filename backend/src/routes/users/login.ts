import { Router } from "express";
import { login } from "../../utils/auth";

class Login {
    router: Router;
    constructor() {
        this.router = Router()
        this.router.post('/login', login)
    }
}

export default Login