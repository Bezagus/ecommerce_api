const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('review', {
        review_id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        stars: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validator:{
                isIn: [[1, 2, 3, 4, 5]]
            }
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    },{
        timestamps: false
    })
}