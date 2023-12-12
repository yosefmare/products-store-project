import { Document } from 'mongoose'

interface BaseDocument extends Document {
    userName?: string;
    email?: string;
    password?: string;

    _id?:string
}

export default BaseDocument