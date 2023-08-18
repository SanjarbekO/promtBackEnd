import express from "express"
import mongoose from "mongoose";
import cors from "cors"
import {registerUserValidation,loginUserValidation,resetPasswordValidation,addOrderValidation} from "./validations/validations.js";
import handleValidators from "./validations/validations.js"
import {loginUser, registerUser, resetPassword} from "./controller/auth.js";
import checkAuth from "./validations/checkAuth.js";
import {getAllUser, getOneUser,deleteOneUser} from "./controller/users.js";
import {createOrder, deleteOneOrder, editOneOrder, getAllOrders, getOneOrder} from "./controller/orders.js";

const api = express();

api.use(express.json());
api.use(cors());



const mongoDbPassword= '123cdexswzaq123';

mongoose.connect(`mongodb+srv://sanjar:${mongoDbPassword}@sanbay.m21vgpa.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => console.log('Mongo DB успешно запущен'))
    .catch((err) => console.log('Ошибка при запуске Mongo DB', err));

const PORT = process.env.PORT || 4444;

// <auth>

api.post('/register', registerUserValidation,handleValidators,registerUser);
api.post('/login',loginUserValidation,handleValidators,loginUser);
api.patch('/reset/password',resetPasswordValidation,handleValidators,checkAuth,resetPassword);
api.delete('/user/:id',checkAuth,deleteOneUser);

api.get('/users',getAllUser);
api.get('/user/:id',getOneUser);

// <auth/>

// <orders>

api.post('/order',addOrderValidation,handleValidators,checkAuth,createOrder);
api.patch('/order/:id',checkAuth,editOneOrder);
api.delete('/order/:id',checkAuth,deleteOneOrder);


api.get('/orders',getAllOrders);
api.get('/order/:id',getOneOrder);

// <orders/>

api.listen(PORT,()=>{
    console.log(`Сервер запущен на порту http://localhost:${PORT}`)
});