import { Router } from "express";
import { getAllEntities, getEntityById, createEntityWithFile, updateEntity, deleteEntity } from "../../utils/utils";
import productsModel from "../../schemas/Products";
import { Request, Response } from 'express'
import CustomersCrudOperations from '../customers/customrs-crud-oparations'
import {upload} from "../../file-managment/multer";
import { protectionRoutesHandler } from "../../utils/auth";

const router = Router()

    router.post('/addProduct', upload.single('file'), (req: Request, res: Response) => {
        protectionRoutesHandler(req, res, createEntityWithFile.bind(null, req, res, productsModel))
        })
    .patch('/editProduct/:id', (req: Request, res: Response) => {
        protectionRoutesHandler(req, res, updateEntity.bind(null, req, res, productsModel))
        })
    .delete('/deleteProduct/:id', (req: Request, res: Response) => {
        protectionRoutesHandler(req, res, deleteEntity.bind(null, req, res, productsModel))
        })
    .get('/getAllProducts', (req, res) => getAllEntities(req, res, productsModel))
    .get('/getProduct/:id', (req, res) => getEntityById(req, res, productsModel))


export default router