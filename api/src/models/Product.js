const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('product',{
        product_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.CHAR(45),
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: 'product does not have provided description'
        },
        img: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true,
            defaultValue: [],
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    })
}