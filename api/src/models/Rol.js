const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>{
    sequelize.define('rol',{
        rol_id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        type: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 2
        }
    },{
        timestamps: false
    })
}