const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('sale',{
        sale_id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        data: {
            type: DataTypes.JSON,
            defaultValue: {},
            allowNull: false
        },
        payment_receipt:{
            type: DataTypes.JSON,
            defaultValue: {},
            allowNull: false
        }
    })
}