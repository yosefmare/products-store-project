import { getAllEntities, getEntityById, createEntity, updateEntity, deleteEntity } from "../../utils/utils";
import PurchasesModel from "../../schemas/Purchases";
import { Request, Response, Router } from 'express'

    const router = Router()
    router.get('/getAllPurchases', (req: Request, res: Response) => getAllEntities(req, res, PurchasesModel, ['product', 'customer']))
        .get('/getPurchase/:id', (req: Request, res: Response) => getEntityById(req, res, PurchasesModel, ['product', 'customer']))
        .post('/addPurchases', (req: Request, res: Response) => createEntity(req, res, PurchasesModel))
        .delete('/deletePurchases/:id', (req: Request, res: Response) => deleteEntity(req, res, PurchasesModel))
        .patch('/editPurchases/:id', (req: Request, res: Response) => updateEntity(req, res, PurchasesModel))
        
export default router