const boom = require('@hapi/boom');
const { User } = require('../db');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt')
const nodemailerService = require('./service.nodemailer')

const nodemailer = new nodemailerService()

class userService{

    async getAllUsers(){
        const allUsers = await User.findAll({
            attributes: ['user_id', 'name', 'nickname', 'img', 'email', 'status', 'createdAt']
        })

        if(allUsers.length <= 0){
            throw boom.notFound('There are no users')
        }

        return allUsers
    }

    async getUserName(nickname){
        const user = await User.findOne({
            where: {
                nickname: nickname
            },
            attributes: ['user_id', 'name', 'nickname', 'img', 'email', 'status', 'createdAt']
        });

        if(!user){
            throw boom.notFound('User not found')
        }

        return user
    }

    async getUserEmail(email){
        const user = await User.findOne({
            where: {
                email: email
            },
            attributes: ['user_id', 'name', 'nickname', 'img', 'email', 'status', 'createdAt']
        });

        if(!user){
            throw boom.notFound('User not found')
        }

        return user
    }

    async getUserId(id){
        const user = await User.findOne({
            where: {
                id: id
            },
            attributes: ['user_id', 'name', 'nickname', 'img', 'email', 'status', 'createdAt']
        });

        if(!user){
            throw boom.notFound('User not found')
        }

        return user
    }

    async createUser(newUserObject){
        const {name, nickname, img, email, password, verificationPassword} = newUserObject;

        const convertName = name.toLowerCase();
        const convertNickname = nickname.toLowerCase();
        const convertEmail = email.toLowerCase();

        const ValidateDateUser = await User.findOne({
            where: {
              [Op.or]: [
                { email: convertEmail },
                { nickname: convertNickname }
              ]
            }
          });

        if(ValidateDateUser){
            throw boom.notFound('provided date already exists')
        }

        const regexEmail = /^\S+@\S+\.\S+$/

        if(!regexEmail.test(convertEmail)){
            throw boom.notFound('invalid email')
        }

        if(password !== verificationPassword){
            throw boom.notFound('passwords do not match')
        }

        const hashPassword = await bcrypt.hash(password, 8)

        const newUser = await User.create({
            name: convertName,
            nickname: convertNickname,
            img: img? img : 'https://cdn-icons-png.flaticon.com/512/847/847969.png',
            email: convertEmail,
            password: hashPassword
        })

        nodemailer.sendEmail(convertEmail)

        return newUser;
    }
}

module.exports = userService;