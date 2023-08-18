import express from "express"
import mongoose from "mongoose";
import cors from "cors"
import {registerUserValidation,loginUserValidation,resetPasswordValidation,addOrderValidation} from "./validations/validations.js";
import handleValidators from "./validations/validations.js"
import {loginUser, registerUser, resetPassword} from "./controller/auth.js";
import checkAuth from "./validations/checkAuth.js";
import {getAllUser, getOneUser,deleteOneUser} from "./controller/users.js";
import {createOrder, deleteOneOrder, editOneOrder, getAllOrders, getOneOrder} from "./controller/orders.js";
import {createCategory, delCategory, getAllCategory} from "./controller/category.js";
import {createSubCategory,getAllSubCategory, delSubCategory} from "./controller/subcategory.js";
import {createSubCategoryItem, delSubCategoryItem, getAllSubCategoryItem} from "./controller/subcategoryitem.js";


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

// <category>

api.post('/category',createCategory);
api.get('/category',getAllCategory);
api.delete('/category/:id',delCategory);

// <category/>

// <subcategory>

api.post('/subcategory',createSubCategory);
api.get('/subcategory/:categoryId',getAllSubCategory);
api.delete('/subcategory/:id',delSubCategory);

// <subcategory/>

// <subcategoryItem>

api.post('/subcategoryItem',createSubCategoryItem);
api.get('/subcategoryItem/:subcategoryId',getAllSubCategoryItem);
api.delete('/subcategoryItem/:id',delSubCategoryItem);

// <subcategoryItem/>


api.listen(PORT,()=>{
    console.log(`Сервер запущен на порту http://localhost:${PORT}`)
});