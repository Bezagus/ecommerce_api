const { DataTypes } = require('sequelize')

module.exports = (sequelize) =>{
    sequelize.define('user',{
        user_id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        nickname:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        img: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'https://cdn-icons-png.flaticon.com/512/847/847969.png',
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validator: {
                isEmail: {
                    args: true,
                    msg: 'Provided email is not valid',
                },
            },
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    })
}