import mongooes from 'mongoose';
import { unique } from 'next/dist/build/utils';

const userSchema = new mongooes.Schema({
    username: {
        type: String,
        required: [true, 'Please provide a username'],
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please provide a email'],
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        select: false 
    },
    isVerfied: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    forgotPasswordToken: String,
    forgotPasswordExpire: Date,
    verifyToken: String,
    verifyExpire: Date,
},{timestamps: true});

export const  User = mongooes.models.users || mongooes.model('users', userSchema);