import { Schema, model } from 'mongoose';
import { CustomersDocument } from '../types/UserAndRegisrationMethodeTypes';


const CustomersSchema = new Schema({
    firstName: String,
    lastName: String,
    city: String
}, {versionKey: false})

const CustomersModel = model<CustomersDocument>('customers', CustomersSchema)

export default CustomersModel   