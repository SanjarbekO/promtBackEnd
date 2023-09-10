import {body} from "express-validator";
import {validationResult} from "express-validator";

export  default (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json(errors.array())
    }
    next()
}

export const registerUserValidation = [
    body('email','Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 8 символов').isLength({min:8}),
    body('login', 'Укажите ваш логин').isString(),
    body('name', 'Укажите ваше имя').isString(),
    body('number', 'Укажите ваш номер').isString(),
    body('image', 'Неверный путь').optional().isString()
];
export const loginUserValidation = [
    body('email','Неверный формат электронной почты').isEmail(),
    body('password', 'Пароль должен быть минимум 8 символов').isLength({min:8})
];
export const resetPasswordValidation = [
    body('email','Неверный формат почты').isEmail(),
    body('oldPassword', 'Пароль должен быть минимум 8 символов').isLength({min:8}),
    body('newPassword', 'Пароль должен быть минимум 8 символов').isLength({min:8})
];

export const addOrderValidation = [
    body('title', 'Заголовок объявления минимум 2 символа').isLength({min:2}),
    body('description', 'Описание объявления минимум 3 символа').isLength({min:3}),
    body('category', 'Неверный формат категории').isString(),
    body('price', 'Неверный формат цены').isNumeric(),
    body('views', 'Неверный формат просмотров').isNumeric(),
    body('status', 'Неверный формат статуса').isString(),
    body('phone', 'Неверный формат номера').isString(),
    body('creatorId','Неверный формат id создателя').isMongoId()
];