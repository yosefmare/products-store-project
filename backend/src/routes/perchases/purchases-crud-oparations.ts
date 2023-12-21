import { Router } from "express";
import { getAllEntities } from "../../utils/utils";
import PurchasesModel from "../../schemas/Purchases";
import { Request, Response } from 'express'

class PurchasesCrudOperations {
    router: Router;
    constructor() {
        this.router = Router()
        this.router.get('/purchases', (req: Request, res: Response) => getAllEntities(req, res, PurchasesModel, ['product', 'customer']))
    }

}

export default PurchasesCrudOperations