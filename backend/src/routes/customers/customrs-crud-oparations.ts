import { Router } from "express";
import { createEntity } from "../../utils/utils";
import CustomersModel from "../../schemas/Customers";
import { Request, Response } from 'express'

class CustomersCrudOperations {
    router: Router;
    constructor() {
        this.router = Router()
        this.router.post('/customers', (req: Request, res: Response) => createEntity(req, res, CustomersModel))
    }

}

export default CustomersCrudOperations