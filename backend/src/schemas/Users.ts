import { Schema, model } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import { BaseDocument } from '../types/UserAndRegisrationMethodeTypes';

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: (value: string) => validator.isEmail(value),
            message: 'Email not valid',
        },
        unique: true,
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: (value: string) => value.length >= 6,
            message: 'Password must be at least 6 characters long',
        },
        select: false,
    },
    role:{
        type: String,
        required: true
    },
    profileImg:{
        type: String
    }
}, { versionKey: false });

// Middleware to hash the password before saving
userSchema.pre<BaseDocument>('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
});

userSchema.methods.correctPassword = async function (candidatePassword: string, userPassword: string) {
    return await bcrypt.compare(candidatePassword, userPassword)
}

const UserModel = model<BaseDocument>('users', userSchema);

export default UserModel;
