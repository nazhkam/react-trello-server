import { body } from "express-validator"

export const registerValidation = [
    body('email', 'Почта указана неверно').isEmail(),
    body('password', 'Пароль должен быть более 5 символов').isLength({ min: 5 }),
    body('fullName', 'Имя указано неверно').isLength({ min: 3 }),
    body('avatarUrl', 'Неверная ссылка на аватарку').optional().isURL(),

]
export const loginValidation = [
    body('email', "invalid Email").isEmail(),
    body('password', "invalid password").isLength({ min: 5 })
]
export const noteValidations = [
    body('blockId', 'wrong id').isString(),
    body('note', 'wrong note').isObject()
]
export const doneNoteValidations = [
    body('blockId', 'wrong id').isString(),
    body('noteId', 'wrong note id').isNumeric()
]

export const blockValidations = [
    body('name', 'wrong name').isString(),
]