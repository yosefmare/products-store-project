import { Router } from "express";
import {getAllEntities } from "../../utils/utils";
import UserModel from "../../schemas/User";

class UsersCrudOperations {
    router: Router;
    constructor() {
        this.router = Router()
        this.router.get('/users',(req,res) => getAllEntities(req,res, UserModel))
    }
}

export default UsersCrudOperations