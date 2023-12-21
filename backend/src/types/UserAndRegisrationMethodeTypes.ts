import { Document, Types } from 'mongoose'

interface BaseDocument extends Document {
    userName?: string;
    email?: string;
    password?: string;
    _id?: string;
    token?: String;
    userId: String;
    correctPassword?: (candidatePassword: string, userPassword: string) => Promise<boolean>;
}

interface PurchasesDocument extends BaseDocument {
    product?: Types.ObjectId[];
    customer: Types.ObjectId;
    date: Date;

}

interface CustomersDocument extends BaseDocument {
    firstName: string,
    lastName: string,
    city: string
}

interface ProductsDocuments extends BaseDocument {
    name: string,
    price: number,
    quantity: number,
    img: string
}

export {
    BaseDocument,
    PurchasesDocument,
    CustomersDocument,
    ProductsDocuments
}