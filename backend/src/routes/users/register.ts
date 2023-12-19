import { Router } from "express";
import { register } from "../../utils/auth";

class Registration {
    router: Router;
    constructor() {
        this.router = Router()
        this.router.post('/register', register)
    }
}

export default Registration