const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('stock_product',{
        stock_product_id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        stock:{
            type: DataTypes.JSON,
            allowNull: false
        }
    },{
        timestamps: false
    })
}