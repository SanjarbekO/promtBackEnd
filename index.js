import express from "express"
import mongoose from "mongoose";
import cors from "cors"
import cloudinary from "cloudinary";
import multer from "multer"
import fs from "node:fs";
import {registerUserValidation,loginUserValidation,resetPasswordValidation,addOrderValidation} from "./validations/validations.js";
import handleValidators from "./validations/validations.js"
import {loginUser, registerUser, resetPassword} from "./controller/auth.js";
import checkAuth from "./validations/checkAuth.js";
import {getAllUser, getOneUser,deleteOneUser} from "./controller/users.js";
import {createOrder, deleteOneOrder, editOneOrder, getAllOrders, getOneOrder} from "./controller/orders.js";
import {createCategory, delCategory, getAllCategory} from "./controller/category.js";
import {createSubCategory,getAllSubCategory, delSubCategory} from "./controller/subcategory.js";
import {createSubCategoryItem, delSubCategoryItem, getAllSubCategoryItem} from "./controller/subcategoryitem.js";
import UsersModel from './models/users.js'


const api = express();

api.use(express.json());
api.use(cors());



const mongoDbPassword= '123cdexswzaq123';

mongoose.connect(`mongodb+srv://sanjar:${mongoDbPassword}@sanbay.m21vgpa.mongodb.net/?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Mongo DB успешно запущен'))
    .catch((err) => console.log('Ошибка при запуске Mongo DB', err));

const PORT = process.env.PORT || 4444;

// <auth>

api.post('/register', registerUserValidation,handleValidators,registerUser);
api.post('/login',loginUserValidation,handleValidators,loginUser);
api.post('/reset/password',resetPasswordValidation,handleValidators,checkAuth,resetPassword);
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

// <cloudinary>

const upload = multer({destination: 'uploads/'});

cloudinary.config({
    cloud_name: 'dvpyhgy2n',
    api_key: '135558996454785',
    api_secret: 'Y2SU-5oikevnMOF3Z5vnCHoa9s0'
});

api.post('/upload', upload.single('file'),(req,res) => {

    const file = req.file;

    if(!file){
        return res.status(400).send('Файл не найден');
    }

    const filename = `${Date.now()}_${file.originalname}`;
    const tempFilePath = `uploads/${filename}`;
    fs.writeFileSync(tempFilePath, file.buffer);


    cloudinary.v2.uploader.upload(tempFilePath, (err,result) => {
        if (err) {
            console.log('Ошибка загрузики файла', err);
            return res.status(500).send('Ошибка загрузки файла')
        }
        fs.unlinkSync(tempFilePath);

        const publicUrl = result.secure_url;
        res.json({
            url: publicUrl
        });
    })
});

api.use('/uploads', express.static('uploads'));

api.post('/reset/upload/:id', upload.single('file'), async (req, res) => {
    try {
        const file = req.file;

        if(!file){
            return res.status(400).send('Файл не найден');
        }

        const filename = `${Date.now()}_${file.originalname}`;
        const tempFilePath = `uploads/${filename}`;
        fs.writeFileSync(tempFilePath, file.buffer);

        cloudinary.v2.uploader.upload(tempFilePath, async (err,result) => {
            if (err) {
                console.log('Ошибка загрузики файла', err);
                return res.status(500).send('Ошибка загрузки файла')
            }
            fs.unlinkSync(tempFilePath);

            const publicUrl = result.secure_url;
            const userId = req.params.id;
            const updatedUser = await UsersModel.findByIdAndUpdate(
                userId,
                { image: publicUrl } ,
                { new: true }
            );

            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json({
                message: 'Image successfully changed',
                user: updatedUser,
            });
        })



    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Failed to update image',
        });
    }
});


// <cloudinary/>


api.listen(PORT,()=>{
    console.log(`Сервер запущен на порту http://localhost:${PORT}`)
});

