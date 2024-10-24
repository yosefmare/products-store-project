import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { BaseDocument } from '../types/UserAndRegisrationMethodeTypes'
import { verifyToken } from "./auth";


export const getAllEntities = async <T extends BaseDocument>(
    req: Request,
    res: Response,
    model: Model<T>,
    populateKeys?: string[]
): Promise<void> => {
    try {
        if (!populateKeys) {
            const entities = await model.find();
            res.status(200).json(entities);
        } else {
            const entities = await model.find().populate(populateKeys);
            res.status(200).json(entities);

        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch entities" });
    }
};

export const getEntityById = async <T extends BaseDocument>(
    req: Request,
    res: Response,
    model: Model<T>,
    populateKeys?: string[]
): Promise<void> => {
    const { id } = req.params;
    try {
        if (!populateKeys) {
            const entity = await model.findById(id);
            if (entity) {
                res.status(200).json(entity);
            } else {
                res.status(404).json({ message: "Entity not found" });
            }
        } else {
            const entity = await model.findById(id).populate(populateKeys);
            if (entity) {
                res.status(200).json(entity);
            } else {
                res.status(404).json({ message: "Entity not found" });
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch entity" });
    }
};

export const createEntity = async <T extends BaseDocument>(
    req: Request,
    res: Response,
    model: Model<T>
): Promise<void> => {
    const { body } = req;

    try {
        const newEntity = await model.create(body);
        res.status(201).json({ message: 'create success', newEntity })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'creation filed' })
    }
}


export const createEntityWithFile = async <T extends BaseDocument>(
    req: Request,
    res: Response,
    model: Model<T>
): Promise<any> => {
    const { body } = req;
    
    try {
        if (!req.file) {
            return res.status(404).json({ message: 'create felid please fill all the filed' })
        } else {
            const { filename } = req.file;
            const newEntity = await model.create({ ...body, productImg: filename });
            return res.status(201).json({ message: 'create success', newEntity })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'creation filed' })
    }
}

export const updateEntity = async <T extends BaseDocument>(
    req: Request,
    res: Response,
    model: Model<T>
): Promise<void> => {
    const { id } = req.params;
    const { body } = req;
    
    try {
        const existingEntity = await model.findById(id);
        if (existingEntity ){ 
            if (req.file) {
                const { filename } = req.file;
                const newEntity = { ...body, productImg: filename };
                existingEntity.set(newEntity);
            } else {
                existingEntity.set(body);
            }

            const updatedEntity = await existingEntity.save();
            res.status(200).json(updatedEntity);
        } else {
            res.status(404).json({ message: "Entity not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update entity" });
    }
};



export const deleteEntity = async <T extends BaseDocument>(
    req: Request,
    res: Response,
    model: Model<T>
): Promise<void> => {
    const { id } = req.params;
    try {
        const deletedEntity = await model.findByIdAndDelete(id);
        if (deletedEntity) {
            res.status(200).json({ message: "Entity deleted successfully" });
        } else {
            res.status(404).json({ message: "Entity not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to delete entity" });
    }
}

export const protectRoute = async (
    req: Request,
    res: Response) => {
    try {
        //     check if the user is admin
        const isVerified = await verifyToken(req)

        if (isVerified) {
            return isVerified
        } else {
        }

    } catch (error) {
        console.log(error);
        res.status(404).json({ message: 'Token has expired' })
    }
}
