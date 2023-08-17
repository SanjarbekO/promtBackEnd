import express from "express"
import mongoose from "mongoose";
import {registerUserValidation,loginUserValidation,resetPasswordValidation} from "./validations/validations.js";
import handleValidators from "./validations/validations.js"
import {loginUser, registerUser, resetPassword} from "./controller/auth.js";
import checkAuth from "./validations/checkAuth.js";

const api = express();

api.use(express.json());



const mongoDbPassword= '123cdexswzaq123';

mongoose.connect(`mongodb+srv://sanjar:${mongoDbPassword}@sanbay.m21vgpa.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => console.log('Mongo DB успешно запущен'))
    .catch((err) => console.log('Ошибка при запуске Mongo DB', err));

const PORT = process.env.PORT || 4444;

// <auth>

api.post('/register', registerUserValidation,handleValidators,registerUser);
api.post('/login',loginUserValidation,handleValidators,loginUser);
api.patch('/reset/password',resetPasswordValidation,handleValidators,checkAuth,resetPassword);

// <auth/>

api.listen(PORT,()=>{
    console.log(`Сервер запущен на порту http://localhost:${PORT}`)
});