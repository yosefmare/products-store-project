import { Router } from 'express'
import { loginUser } from '../utils/utils'
import UserModel from '../schemas/User'

class Login {
    public router: Router
    constructor(){
    this.router = Router()

this.router.post('/login', (req,res) => loginUser(req,res, UserModel))
    }
}

export default Login