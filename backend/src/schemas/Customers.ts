import { Schema, model } from 'mongoose';
import { CustomersDocument } from '../types/UserAndRegisrationMethodeTypes';

const ObjectId = Schema.Types.ObjectId


const CustomersSchema = new Schema({
    user:{
        type: ObjectId,
        ref: 'customers'
    },
    firstName: String,
    lastName: String,
    city: String
}, {versionKey: false})

const CustomersModel = model<CustomersDocument>('customers', CustomersSchema)

export default CustomersModel   