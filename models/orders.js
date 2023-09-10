import mongoose from "mongoose";

const creatorDataSchema = new mongoose.Schema({
    _id: false,
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: String
});

const ordersSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    subcategory: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    views: {
        type: Number,
        required:true
    },
    status: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    creatorData: {
        type: creatorDataSchema,
        required: true
    },
    image: String
}, {
    timestamps: true
});

export default mongoose.model('services', ordersSchema)