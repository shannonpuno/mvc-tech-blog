const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class comments extends Model {}

comments.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        text: {
            type: DataTypes.STRING,
        },
        post_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        blogPost_i: {
            type: DataTypes.INTEGER,
            references: {
                model: 'blogPosts',
                key: 'id',
            },
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'User',
                key: 'username',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'comments',
    }
);

module.exports = comments;