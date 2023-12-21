import { Schema, model } from 'mongoose';

const CustomersSchema = new Schema({
    firstName: String,
    lastName: String,
    city: String
})

const CustomersModel = model('customers', CustomersSchema)

export default CustomersModel   