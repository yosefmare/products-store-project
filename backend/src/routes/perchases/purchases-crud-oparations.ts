import { Router } from "express";
import { getAllEntities, getEntityById, createEntity, updateEntity, deleteEntity } from "../../utils/utils";
import PurchasesModel from "../../schemas/Purchases";
import { Request, Response } from 'express'

class PurchasesCrudOperations {
    router: Router;
    constructor() {
        this.router = Router()
        this.router.get('/purchases', (req: Request, res: Response) => getAllEntities(req, res, PurchasesModel, ['product', 'customer']))
        this.router.get('/purchases/:id', (req: Request, res: Response) => getEntityById(req, res, PurchasesModel, ['product', 'customer']))
        this.router.post('/purchases/addPurchases', (req: Request, res: Response) => createEntity(req, res, PurchasesModel))
        this.router.delete('/purchases/deletePurchases/:id', (req: Request, res: Response) => deleteEntity(req, res, PurchasesModel))
        this.router.patch('/purchases/editPurchases/:id', (req: Request, res: Response) => updateEntity(req, res, PurchasesModel))
    }

}

export default PurchasesCrudOperations