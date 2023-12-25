import { Router } from "express";
import { getAllEntities, getEntityById, createEntityWithFile, updateEntity, deleteEntity } from "../../utils/utils";
import productsModel from "../../schemas/Products";
import { Request, Response } from 'express'
import CustomersCrudOperations from '../customers/customrs-crud-oparations'
import upload from "../../utils/multer";

class ProductsCrudOperations extends CustomersCrudOperations {
    constructor() {
        super()
        this.router.post('/products/addProduct', upload.single('file'), (req: Request, res: Response) => {
            this.protectionRoutesHandler(req, res, createEntityWithFile.bind(null, req, res, productsModel))
        })
        this.router.patch('/products/editProduct/:id', (req: Request, res: Response) => {
            this.protectionRoutesHandler(req, res, updateEntity.bind(null, req, res, productsModel))
        })
        this.router.delete('/products/deleteProduct/:id', (req: Request, res: Response) => {
            this.protectionRoutesHandler(req, res, deleteEntity.bind(null, req, res, productsModel))
        })
        this.router.get('/products', (req, res) => getAllEntities(req, res, productsModel))
        this.router.get('/products/:id', (req, res) => getEntityById(req, res, productsModel))
    }

}

export default ProductsCrudOperations