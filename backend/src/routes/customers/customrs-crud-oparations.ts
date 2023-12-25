import { Router } from "express";
import { createEntity, getAllEntities, getEntityById, updateEntity, deleteEntity, protectRoute } from "../../utils/utils";
import CustomersModel from "../../schemas/Customers";
import { Request, Response } from 'express'

class CustomersCrudOperations {
    router: Router;
    constructor() {
        this.router = Router()
        this.router.get('/customers', (req: Request, res: Response) => getAllEntities(req, res, CustomersModel))
        this.router.get('/customers/:id', (req: Request, res: Response) => getEntityById(req, res, CustomersModel))

        this.router.post('/customers/addCustomer', (req: Request, res: Response) => {
            this.protectionRoutesHandler(req, res, createEntity.bind(null, req, res, CustomersModel));
        });
        this.router.patch('/customers/updateCustomer/:id', (req: Request, res: Response) => {
            this.protectionRoutesHandler(req, res, updateEntity.bind(null, req, res, CustomersModel))
        })
        this.router.delete('/customers/deleteCustomer/:id', (req: Request, res: Response) => {
            this.protectionRoutesHandler(req, res, deleteEntity.bind(null, req, res, CustomersModel))
        })
    }

    protected async protectionRoutesHandler(req: Request, res: Response, model: Function) {
        //     check if the user is admin
        if (req.headers.authorization) {
            const isAdmin = await protectRoute(req, res)
            if (isAdmin.role === 'admin') {
                await model()
            } else {
                res.status(404).json({ message: 'User ar not a admin' });
            }
        } else {
            res.status(401).json({ message: 'Unauthorized - Authorization header missing' });
        }
    }
}


export default CustomersCrudOperations