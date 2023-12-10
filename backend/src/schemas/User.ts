import { Schema, model } from 'mongoose';
import validator from 'validator';

const User = new Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: (value: string) => validator.isEmail(value),
            message: 'Email not valid'
        },
        unique: true
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: (value: string) => value.length >= 6,
            message: 'Password must be at least 6 characters long'
        },
    },
}, { versionKey: false });

const UserModel = model('users', User);

export default UserModel;
