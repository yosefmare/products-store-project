import { Router } from "express";
import { createEntity, getAllEntities, getEntityById, updateEntity, deleteEntity, protectRoute } from "../../utils/utils";
import CustomersModel from "../../schemas/Customers";
import { Request, Response } from 'express'
import { protectionRoutesHandler } from "../../utils/auth";

        const router = Router()
        router.get('customers/getAllCustomers', (req: Request, res: Response) => getAllEntities(req, res, CustomersModel))
        .get('customers/getCustomer/:id', (req: Request, res: Response) => getEntityById(req, res, CustomersModel))

        .post('customers/addCustomer', (req: Request, res: Response) => {
            protectionRoutesHandler(req, res, createEntity.bind(null, req, res, CustomersModel));
        })
        .patch('customers/updateCustomer/:id', (req: Request, res: Response) => {
            protectionRoutesHandler(req, res, updateEntity.bind(null, req, res, CustomersModel))
        })
        .delete('customers/deleteCustomer/:id', (req: Request, res: Response) => {
            protectionRoutesHandler(req, res, deleteEntity.bind(null, req, res, CustomersModel))
        })


export default router