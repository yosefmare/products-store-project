import { Schema, model } from 'mongoose';
import { ProductsDocuments } from '../types/UserAndRegisrationMethodeTypes';


const ProductsSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    productImg: { type: String, required: true },
    category: {
        type: [{
            type: String,
            required: true
        }],
        validate: [categoryLengthValidator, 'Category array length must be at least 1 and at most 5']
    }
}, { versionKey: false });

function categoryLengthValidator(value: string) {
    return value.length >= 1 && value.length <= 3;
}

const ProductsModal = model<ProductsDocuments>('products', ProductsSchema)

export default ProductsModal