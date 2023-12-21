import { Schema, model } from 'mongoose';
import { ProductsDocuments } from '../types/UserAndRegisrationMethodeTypes';


const ProductsSchema = new Schema({
    name: String,
    price: Number,
    quantity: Number,
    img: String
}, {versionKey: false})

const ProductsModal = model <ProductsDocuments>('products', ProductsSchema)

export default ProductsModal