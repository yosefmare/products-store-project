import { getAllEntities, getEntityById, createEntity, updateEntity, deleteEntity } from "../../utils/utils";
import PurchasesModel from "../../schemas/Purchases";
import { Request, Response, Router } from 'express'

    const router = Router()
    router.get('/purchases/getAllPurchases', (req: Request, res: Response) => getAllEntities(req, res, PurchasesModel, ['product', 'customer']))
        .get('/purchases/getPurchase/:id', (req: Request, res: Response) => getEntityById(req, res, PurchasesModel, ['product', 'customer']))
        .post('/purchases/addPurchases', (req: Request, res: Response) => createEntity(req, res, PurchasesModel))
        .delete('/purchases/deletePurchases/:id', (req: Request, res: Response) => deleteEntity(req, res, PurchasesModel))
        .patch('/purchases/editPurchases/:id', (req: Request, res: Response) => updateEntity(req, res, PurchasesModel))
        
export default router