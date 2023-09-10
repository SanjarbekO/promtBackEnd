import OrdersModel from '../models/orders.js'
import UsersModel from "../models/users.js";



export const createOrder = async (req, res) => {
    try {
        const user = await UsersModel.findOne({_id: req.body.creatorId})

        if(!user){
            res.status({
                message: "Пользователь не найден (creatorId)",
                status: 403
            })
        }

        const request = req.body;
        const {creatorId, ...reqBody}= request;

        const resData = {
            ...reqBody, creatorData: {
                id: user._id,
                name: user.name,
                image: user.image
            }
        };

        const doc = new OrdersModel(resData);

        await doc.save();

        res.json({
            message: 'Заказ добавлен',
            states: 'success'
        })


    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось создать заказ'
        })
    }
};

export const getAllOrders = async (req,res) => {
    try{

        let orders ;

        if (req.query.price === 'asc') {
            orders = await OrdersModel.find().sort({price: 1})
        } else if (req.query.price === 'desc') {
            orders = await OrdersModel.find().sort({price: -1})
        } else {
            orders = await OrdersModel.find()
        }

        if (req.query.status) {
            orders = orders.filter(item => item.status === req.query.status)
        }

        if (req.query.creatorData) {
            orders = orders.filter(item => item.creatorData.id === req.query.id)
        }

        if(req.query.category){
            orders = orders.filter(item => req.query.category.includes(item.category))
        }
        if (req.query.createdAt) {
            // Предположим, что req.query.createdAt содержит дату в формате строки (например, '2023-09-10')
            const filterDate = new Date(req.query.createdAt);

            orders = orders.filter((item) => {
                const orderDate = new Date(item.createdAt);
                return orderDate > filterDate;
            });
        }

        res.json(orders)

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить заказы'
        })
    }
};

export const getOneOrder = async (req, res) => {
    try {
        const order = await OrdersModel.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                message: "Заказ не найден",
            });
        }

        // if (req.query.views) {
        //     // Increment the view count if requested
        //     await OrdersModel.updateOne(
        //         { _id: req.params.id },
        //         { $inc: { views: 1 } }
        //     );
        // }

        // Find the user data based on the creatorId in the order
        const user = await UsersModel.findById(order.creatorData.id);

        // Combine the order and user data to include creatorData
        const orderWithCreatorData = {
            ...order.toObject(), // Convert Mongoose document to plain object
            creatorData: {
                id: user._id,
                name: user.name,
                image: user.image,
            },
        };

        res.json(orderWithCreatorData);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Не удалось получить заказ",
        });
    }
};


export const editOneOrder = async (req, res) => {
    try {

        await OrdersModel.updateOne({_id: req.params.id},
            req.body,
            {returnDocument: 'after'});

        res.json({
            message: 'Заказ успешно изменен',
            status: 'success'
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось изменить заказ'
        })
    }
};

export const deleteOneOrder = async (req, res) => {
    try {

        await OrdersModel.deleteOne({_id: req.params.id});

        res.json({
            message: 'Заказ успешно удалён',
            status: 'success'
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось удалить Заказ'
        })
    }
};



// const trackDeclarationView = async (req, res, next) => {
//     try {
//         const { id } = req.params;
//         const userIP = req.ip; // You can use user's IP for simplicity
//
//         // Check if the user has already viewed this declaration (you might want to add more robust user tracking)
//         const hasUserViewed = await ViewLogModel.exists({ declarationId: id, userIP });
//
//         if (!hasUserViewed) {
//             // Increment the view count in the declaration document
//             await OrdersModel.updateOne({ _id: id }, { $inc: { views: 1 } });
//
//             // Record the user's view
//             await ViewLogModel.create({ declarationId: id, userIP });
//
//             // Continue processing the request
//             next();
//         } else {
//             // User has already viewed, proceed without incrementing view count
//             next();
//         }
//     } catch (error) {
//         console.error('Error tracking view:', error);
//         next();
//     }
// };

export const increaseViews = async (req, res) => {
    try {
        const orderId = req.params.id; // Получаем id заказа из параметра запроса
        const order = await OrdersModel.findById(orderId);

        if (!order) {
            return res.status(404).json({
                message: 'Заказ не найден',
                status: 'error'
            });
        }

        const userId = req.body.userId; // Получаем id пользователя из тела запроса

        console.log('userId:', userId);
        console.log('order.creatorData.id:', order.creatorData.id);

        // Проверяем, что userId не равен id создателя заказа
        if (userId !== order.creatorData.id) {
            // Увеличиваем views на 1
            const updatedOrder = await OrdersModel.findByIdAndUpdate(
                orderId,
                { $inc: { views: 1 } },
                { new: true }
            );

            return res.json({
                message: 'Views увеличены',
                status: 'success',
                updatedOrder
            });
        } else {
            return res.json({
                message: 'Вы не можете увеличивать views своего собственного заказа',
                status: 'success',
                order // Возвращаем информацию о заказе без увеличения views
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Не удалось увеличить views',
            status: 'error'
        });
    }
};