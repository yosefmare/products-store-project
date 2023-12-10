import { Request, Response } from 'express';
import { Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';

interface BaseDocument extends Document {
    userName: string;
    email: string;
    password: string;
}

export const registerEntity = async <T extends BaseDocument>(
    req: Request,
    res: Response,
    model: Model<T>
): Promise<void> => {
    try {
        const { userName, email, password } = req.body;
        const findEmail = await model.findOne({ email });
        if (!findEmail) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await model.create({ userName, email, password: hashedPassword });
            res.status(201).json({ newUser, message: "user registration successful" });
        } else {
            res.status(400).json({ message: "Email already exists" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Registration failed" });
    }
};

export const getAllEntities = async <T extends BaseDocument>(
    req: Request,
    res: Response,
    model: Model<T>
): Promise<void> => {
    try {
        const entities = await model.find();
        res.status(200).json(entities);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch entities" });
    }
};

export const getEntityById = async <T extends BaseDocument>(
    req: Request,
    res: Response,
    model: Model<T>
): Promise<void> => {
    const { id } = req.params;
    try {
        const entity = await model.findById(id);
        if (entity) {
            res.status(200).json(entity);
        } else {
            res.status(404).json({ message: "Entity not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch entity" });
    }
};

export const updateEntity = async <T extends BaseDocument>(
    req: Request,
    res: Response,
    model: Model<T>
): Promise<void> => {
    const { id } = req.params;
    const { body } = req;

    try {
        const existingEntity = await model.findById(id);
        if (existingEntity) {
            existingEntity.set(body);

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
};
