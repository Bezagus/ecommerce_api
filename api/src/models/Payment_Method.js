const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>{
    sequelize.define('payment_method',{
        paymen_method_id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        type:{
            type: DataTypes.CHAR(45),
            allowNull: false,
            unique: true,
        }
    }, {
        timestamps: false
    })
}