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

        if (req.query.id) {
            orders = orders.filter(item => item.creatorData.id === req.query.id)
        }

        if(req.query.category){
            orders = orders.filter(item => item.category === req.query.category)
        }

        res.json(orders)

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить заказы'
        })
    }
};

export const getOneOrder = async (req,res) => {
    try{
        const order = await OrdersModel.findById(req.params.id);


        if (req.query.views) {
            await OrdersModel.updateOne({_id: req.params.id},{
                views: order.views + 1
            }, {returnDocument: 'after'})
        }

        res.json(order)

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить заказ'
        })
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
