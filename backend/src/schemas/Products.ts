import { Schema, model } from 'mongoose';
const ProductsSchema = new Schema({
    name: String,
    price: Number,
    quantity: Number
})

const ProductsModal = model('products', ProductsSchema)

export default ProductsModal