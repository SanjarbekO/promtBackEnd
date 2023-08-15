import mongoose from "mongoose";

const subcategoryItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    subcategoryId: {
        type: String,
        required: true
    },

}, {
    timestamps: true
});

export default mongoose.model('subCategoryItem', subcategoryItemSchema)