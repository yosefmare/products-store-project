import { Document } from 'mongoose'

interface BaseDocument extends Document {
    userName?: string;
    email?: string;
    password?: string;
    _id?:string;
    token?: String;
    userId: String;

}

export default BaseDocument