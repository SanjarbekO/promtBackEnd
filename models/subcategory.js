import mongoose from "mongoose";

const subcategorySchema = new mongoose.Schema({
    subCategoryName: {
        type: String,
        required: true
    },
    categoryId: {
        type: String,
        required: true
    },

}, {
    timestamps: true
})

export default mongoose.model('subCategory', subcategorySchema)