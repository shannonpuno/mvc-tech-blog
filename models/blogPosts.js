const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class blogPosts extends Model {}

blogPosts.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        contents: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        post_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        username: {
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
        modelName: 'blogPosts',
    }
);

module.exports = blogPosts;


