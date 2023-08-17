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

// export const editOneUser = async (req,res) => {
//     try {
//
//         await UsersModel.updateOne({_id: req.params.id},
//             req.body,
//             {returnDocument: 'after'});
//
//         res.json({
//             message: 'Заказ успешно изменен',
//             status: 'success'
//         })
//
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({
//             message: 'Не удалось изменить юзера'
//         })
//     }
// };

// export const deleteOneUser = async (req,res) => {
//     try {
//
//         const user = await UsersModel.findOne({email: req.body.email});
//
//         const inValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);
//
//
//         if (!inValidPass) {
//             return res.status(404).json({
//                 message: 'Неверный пароль'
//             })
//         }
//
//         await UsersModel.deleteOne({email: req.body.email});
//
//         res.json({
//             message: 'Юзер успешно удалён',
//             status: 'success'
//         })
//
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({
//             message: 'Не удалось удалить юзера'
//         })
//     }
// };