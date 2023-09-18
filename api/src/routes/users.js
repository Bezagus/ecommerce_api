const express = require('express');
const {User} = require('../db');
const bcrypt = require('bcrypt');
const transporter = require('./middleware/nodemailer');
const { Op } = require('sequelize');
const { NODEMAILER_EMIAL } = process.env


const app = express.Router();

app.get('/',async (req, res)=>{
    try{
        const allUsers = await User.findAll({
            attributes: ['user_id', 'name', 'nickname', 'img', 'email', 'status', 'createdAt']
        })

        if(allUsers.length <= 0){
            return res.status(200).send({message: 'There are no users'})
        }

        return res.status(200).json(allUsers)
    }catch{
        return res.status(500).send({error: 'unexpected server error'})
    }
})

app.get('/oneUser/:param',async (req, res)=>{
    try{
        const {param} = req.params

        if(!param){
            return res.status(400).send({error:'Information required not provided.'})
        }

        const user = await User.findOne({
            where: {
              [Op.or]: [
                { email: param },
                { nickname: param }
              ]
            },
            attributes: ['user_id', 'name', 'nickname', 'img', 'email', 'status', 'createdAt']
          });

        if(!user){
            return res.status(200).send({message: 'User not found'})
        }

        return res.status(200).send(user)

    }catch{
        return res.status(500).send({error: 'unexpected server error'})
    }
})

app.get('/userId',async (req, res)=>{
    try{
        const {id} = req.query

        if(!id){
            return res.status(400).send({error:'Information required not provided.'})
        }

        const user = await User.findOne({
            where: {
                user_id: id
            },
            attributes: ['user_id', 'name', 'nickname', 'img', 'email', 'status', 'createdAt']
          });

        if(!user){
            return res.status(200).send({message: 'User not found'})
        }

        return res.status(200).send(user)

    }catch{
        return res.status(500).send({error: 'unexpected server error'})
    }
})

app.post('/create',async (req, res)=>{
    try{
        const {name, nickname, img, email, password, verificationPassword} = req.body;

        if(!name || !nickname || !email || !password || !verificationPassword){
            return res.status(400).send({ error: 'required information is missing'})
        }

        const convertName = name.toLowerCase();
        const convertNickname = nickname.toLowerCase();
        const convertEmail = email.toLowerCase();

        const userEmailValidator = await User.findOne({
            where:{
                email: convertEmail
            }
        })

        if(userEmailValidator){
            return res.status(409).send({error:'provided email already exists'})
        }

        const nicknameValidator = await User.findOne({
            where: {
                nickname: convertNickname
            }
        });

        if(nicknameValidator){
            return res.status(409).send({error: 'nickname already exists'})
        }

        const regexEmail = /^\S+@\S+\.\S+$/

        if(!regexEmail.test(convertEmail)){
            return res.status(400).send({error:'invalid email'})
        }

        if(password !== verificationPassword){
            return res.status(400).send({error: 'passwords do not match'})
        }

        const hashPassword = await bcrypt.hash(password, 8)

        const newUser = await User.create({
            name: convertName,
            nickname: convertNickname,
            img: img? img : 'https://cdn-icons-png.flaticon.com/512/847/847969.png',
            email: convertEmail,
            password: hashPassword
        })

       await transporter.sendMail({
            from: `"BezInnovate" <${NODEMAILER_EMIAL}>`,
            to: convertEmail,
            subject: "Welcome to BezInnovate!! User verification pending",
            html: "<b>Hello world?</b>", // html body
          });
          
        return res.status(201).send({message:'user created successfully'})

    }catch{
        return res.status(500).send({error: 'unexpected server error'})
    }
})

module.exports = app;