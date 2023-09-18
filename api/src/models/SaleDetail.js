const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('sale_detail',{
        sale_deatil_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKer: true
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        discount: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0
        },
        detail_sale: {
            type: DataTypes.JSON,
            allowNull: false,
            defaultValue: {}
        }
    })
}