import { getAllEntities, getEntityById, createEntity, updateEntity, deleteEntity } from "../../utils/utils";
import PurchasesModel from "../../schemas/Purchases";
import { Request, Response, Router } from 'express'
import { protectionRoutesHandler } from "../../utils/auth";
import { upload } from "file-managment/multer";

const router = Router()
router
    .get('/purchases/getAllPurchases', (req: Request, res: Response) => {
        protectionRoutesHandler(req, res, getAllEntities.bind(null, req, res, PurchasesModel, ['product', 'customer']))
    })
    .get('/purchases/getPurchase/:id', (req: Request, res: Response) => {
        protectionRoutesHandler(req, res, getEntityById.bind(null, req, res, PurchasesModel, ['product', 'customer']))
    })
    .post('/purchases/addPurchases', upload.single('file'), (req: Request, res: Response) => createEntity(req, res, PurchasesModel))
    .delete('/purchases/deletePurchases/:id', (req: Request, res: Response) => deleteEntity(req, res, PurchasesModel))
    .patch('/purchases/editPurchases/:id', upload.single('file'), (req: Request, res: Response) => updateEntity(req, res, PurchasesModel))

export default router