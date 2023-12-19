import { Document } from 'mongoose'

interface BaseDocument extends Document {
    userName?: string;
    email?: string;
    password?: string;
    _id?: string;
    token?: String;
    userId: String;
    correctPassword?: (candidatePassword: string, userPassword: string) => Promise<boolean>;
}

interface JwtPayload {
    email?: string;
    _id?: string;

}

export {
    BaseDocument,
    JwtPayload
}