import { Router } from "express";
import { createEntity, getAllEntities, getEntityById, updateEntity, deleteEntity, protectRoute } from "../../utils/utils";
import CustomersModel from "../../schemas/Customers";
import { Request, Response } from 'express'
import { protectionRoutesHandler } from "../../utils/auth";
import { upload } from "../../file-managment/multer";

const router = Router()
router
    .get('/customers/getAllCustomers', (req: Request, res: Response) => {
        protectionRoutesHandler(req, res, getAllEntities.bind(null, req, res, CustomersModel))
    })
    .get('/customers/getCustomer/:id', (req: Request, res: Response) => {
        protectionRoutesHandler(req, res, getEntityById.bind(null, req, res, CustomersModel))
    })
    .post('/customers/addCustomer', upload.single('file'), (req: Request, res: Response) => createEntity(req, res, CustomersModel))
    .patch('/customers/updateCustomer/:id', upload.single('file'), (req: Request, res: Response) => {
        protectionRoutesHandler(req, res, updateEntity.bind(null, req, res, CustomersModel))
    })
    .delete('/customers/deleteCustomer/:id', (req: Request, res: Response) => {
        protectionRoutesHandler(req, res, deleteEntity.bind(null, req, res, CustomersModel))
    })


export default router