import CategoryModel from "../models/category.js";

export const createCategory = async (req,res) => {
    try {
        const doc = new CategoryModel(req.body);

        await doc.save();

        res.json({
            message: "Категория добавлена",
            status: "success"
        })
    }catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось добавить категории'
        })
    }
};

export const getAllCategory = async (req,res) => {
    try {

        const categories = await  CategoryModel.find();

        res.json(categories)

    }catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить категории'
        })
    }
};

export const delCategory = async (req,res) => {
    try {
        await CategoryModel.deleteOne({_id: req.params.id});

        res.json({
            message: 'Категория успешно удалена',
            status: 'success'
        })
    }catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось удалить категории'
        })
    }
};