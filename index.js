import express from "express"
import mongoose from "mongoose";

const api = express();

const mongoDbPassword= '123cdexswzaq123';

mongoose.connect(`mongodb+srv://sanjar:${mongoDbPassword}@sanbay.m21vgpa.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => console.log('Mongo DB успешно запущен'))
    .catch((err) => console.log('Ошибка при запуске Mongo DB', err));

const PORT = process.env.PORT || 4444;

api.listen(PORT,()=>{
    console.log(`Сервер запущен на порту http://localhost:${PORT}`)
});