import { Router } from 'express'
import { registerEntity } from '../utils/auth/auth'
import UserModel from '../schemas/User'

class Registration {
    public router: Router
    constructor(){
    this.router = Router()

this.router.post('/register', (req,res) => registerEntity(req,res, UserModel))
    }
}

export default Registration