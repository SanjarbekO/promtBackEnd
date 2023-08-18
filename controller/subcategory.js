import SubCategoryModel from '../models/subcategory.js';

export const createSubCategory = async (req,res) => {
    try {
        const doc = new SubCategoryModel(req.body);

        await doc.save();

        res.json({
            message: "Под категория добавлена",
            status: "success"
        })
    }catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось  добавить под категории'
        })
    }
};

export const getAllSubCategory = async (req,res) => {
    try {
        const subCategory = await SubCategoryModel.find({categoryId: req.params.categoryId});

        res.json(subCategory)

    }catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить под категории'
        })
    }

};

export const delSubCategory = async (req,res) => {
    try{

        await SubCategoryModel.deleteOne({_id: req.params.id});

        res.json({
            message: 'Под категория успешно удалена',
            status: 'success'
        })

    }catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось удалить под категории'
        })
    }
};
