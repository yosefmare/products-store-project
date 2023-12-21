import { Schema, model } from 'mongoose';

const ObjectId = Schema.Types.ObjectId

const PurchasesSchema = new Schema({
    customer: {
        type: ObjectId,
        ref: 'customers'
    },
    product: [
        {
            type: ObjectId,
            ref: 'products'
        }
    ],
    date: Date
})

const PurchasesModel = model('purchases', PurchasesSchema)

export default PurchasesModel