const Joi = require('joi');


const id = Joi.string().uuid();
const name = Joi.string().min(5);
const nickname = Joi.string().min(5).max(20);
const img = Joi.string().uri();
const email = Joi.string().email();
const password = Joi.string().min(8);

const createUserSchema = Joi.object({
    name: name.required(),
    nickname: nickname.required(),
    email: email.required(),
    img: img,
    password: password.required(),
    verificationPassword: password.required()
})

const userIdSchema = Joi.object({
    id: id.required()
})

const userNicknameSchema = Joi.object({
    nickname: nickname.required()
})

const userEmailSchema = Joi.object({
    email: email.required()
})

module.exports = {
    createUserSchema,
    userIdSchema,
    userNicknameSchema,
    userEmailSchema
}