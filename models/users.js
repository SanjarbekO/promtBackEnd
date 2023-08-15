import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    email : {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    login : {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    image: String,
}, {
    timestamps: true
});

export default mongoose.model('users', usersSchema)