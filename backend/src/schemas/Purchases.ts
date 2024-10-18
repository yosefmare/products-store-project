import { Schema, model } from 'mongoose';
import { PurchasesDocument } from '../types/UserAndRegisrationMethodeTypes';


const ObjectId = Schema.Types.ObjectId

const PurchasesSchema = new Schema({
    customerId: {
        type: ObjectId,
        ref: 'customers'
    },
    products: [
        {
            type: ObjectId,
            ref: 'products'
        }
    ],
    date: {type:Date, default: Date.now()}
},{versionKey: false})

const PurchasesModel = model<PurchasesDocument>('purchases', PurchasesSchema)

export default PurchasesModel