import UsersModel from '../models/users.js'



export const getAllUser = async (req, res) => {
    try {

        const users = await UsersModel.find({
            status: req.query.status
        });

        res.json(users)

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить пользователей'
        })
    }
};

export const getOneUser = async (req,res) => {
    try {

        const review = await UsersModel.findById(req.params.id);

        res.json(review)

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить юзера'
        })
    }
};

export const editOneUser = async (req,res) => {
    try {
        const updateUser =await UsersModel.findByIdAndUpdate( req.params.id,
            req.body,
            {returnDocument: 'after'});

        res.status(200).json({
            message: 'Юзер успешно изменен',
            status: 'success',
            user: updateUser
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось изменить юзера'
        })
    }
};

export const deleteOneUser = async (req,res) => {
    try {

        await UsersModel.deleteOne({_id: req.params.id});

        res.json({
            message: 'Юзер успешно удалён',
            status: 'success'
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось удалить юзера'
        })
    }
};