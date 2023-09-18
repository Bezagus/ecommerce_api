const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>{
    sequelize.define('comment',{
        comment_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        content:{
            type: DataTypes.TEXT,
            allowNull: false
        }
    },{
        timestamps: false
    })
}