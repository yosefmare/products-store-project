import { Router } from "express";
import { createEntity } from "../../utils/utils";
import productsModel from "../../schemas/Products";
import { Request, Response } from 'express'

class ProductsCrudOperations {
    router: Router;
    constructor() {
        this.router = Router()
        this.router.post('/products', (req: Request, res: Response) => createEntity(req, res, productsModel))
    }

}

export default ProductsCrudOperations