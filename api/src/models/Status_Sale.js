const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define('status_sale',{
        status_sale_id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        type: {
            type: DataTypes.CHAR(45),
            allowNull: false,
            unique: true
        }
    },{
        timestamps: false
    })
}