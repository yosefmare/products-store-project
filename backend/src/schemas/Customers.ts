import { Schema, model } from 'mongoose';
import { CustomersDocument } from '../types/UserAndRegisrationMethodeTypes';

const ObjectId = Schema.Types.ObjectId


const CustomersSchema = new Schema({
    user: {
        type: ObjectId,
        ref: 'customers'
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    purchases: {
        type: [ObjectId],
        ref: 'purchases'
    }
}, { versionKey: false })

const CustomersModel = model<CustomersDocument>('customers', CustomersSchema)

export default CustomersModel   