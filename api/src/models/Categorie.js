const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('categorie',{
        categorie_id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.CHAR(45),
            allowNull: false,
            unique: true
        }
    },{
        timestamps: false
    })
}