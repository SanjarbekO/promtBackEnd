import SubCategoryItemModel from '../models/subcategoryitem.js';

export const createSubCategoryItem = async (req,res) => {
    try {

        const doc = new SubCategoryItemModel(req.body);

        await doc.save();

        res.json({
            message: "Добавлена",
            status: "success"
        })

    }catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось  добавить '
        })
    }
};

export const getAllSubCategoryItem = async (req,res) => {
    try {
        const subCategory = await SubCategoryItemModel.find({categoryId: req.params.categoryId});

        res.json(subCategory)

    }catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить'
        })
    }
};

export const delSubCategoryItem = async (req,res) => {
    try{

        await SubCategoryItemModel.deleteOne({_id: req.params.id});

        res.json({
            message: 'Успешно удалено',
            status: 'success'
        })

    }catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось удалить'
        })
    }
};