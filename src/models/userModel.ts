import mongooes from 'mongoose';

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
        unique:true
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        select: false 
    },
    isVerified: {
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