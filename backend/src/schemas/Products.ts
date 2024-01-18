import { Schema, model } from 'mongoose';
import { ProductsDocuments } from '../types/UserAndRegisrationMethodeTypes';


const ProductsSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    productImg: { type: String, required: true },
    category: [
        { type: String, required: true }
    ]
}, { versionKey: false })

const ProductsModal = model<ProductsDocuments>('products', ProductsSchema)

export default ProductsModal