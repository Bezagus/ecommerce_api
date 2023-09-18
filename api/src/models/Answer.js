const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>{
    sequelize.define('answer', {
        answer_id:{
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    },{
        timestamps: false
    })
}