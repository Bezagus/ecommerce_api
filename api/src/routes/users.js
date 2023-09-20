const express = require('express');
const validatorHandler = require('../Middlewares/validator.handler');
const { createUserSchema, userIdSchema, userNicknameSchema, userEmailSchema} = require('../Schema/user.schema')

const userService = require('../Service/user.service')


const app = express.Router();
const usersService = new userService()

app.get('/',async (req, res, next)=>{
    try{

        const allUsers = await usersService.getAllUsers()
        return res.status(200).json(allUsers)

    }catch(error){
        next(error)
    }
})

app.get('/userNickname/:nickname',
    validatorHandler(userNicknameSchema, 'params'),
    async (req, res, next)=>{
        try{
            const {nickname} = req.params

            const getUserName = await usersService.getUserName(nickname)
            return res.status(200).send(getUserName)

        }catch(error){
            next(error)
        }
})

app.get('/userEmial/:email',
    validatorHandler(userEmailSchema, 'params '),
    async (req, res, next)=>{
        try{
            const {email} = req.params

            const getUserEmail = await userService.getUserEmail(email)
            return res.status(200).send(getUserEmail)

        }catch(error){
            next(error)
        }
})

app.get('/userId/:id',
    validatorHandler(userIdSchema, 'params'),
    async (req, res, next)=>{
        try{
            const {id} = req.params
            const getUserId = await usersService.getUserId(id)
            return res.status(200).send(getUserId)

        }catch(error){
            next(error)
        }
})

app.post('/create',
    validatorHandler(createUserSchema, 'body'),
    async (req, res, next)=>{
        try{
            const newUser = await usersService.createUser(req.body)

            return res.status(201).json({
                message:'user created successfully',
                user: newUser
            })

        }catch(error){
            next(error)
    }
})

module.exports = app;