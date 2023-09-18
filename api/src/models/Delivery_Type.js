const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('delivery_type',{
        deliveri_type_id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        type:{
            type: DataTypes.CHAR(45),
            allowNull: false,
            unique: true
        }
    },{
        timestamps: false
    })
}