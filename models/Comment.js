// Import necessary modules for defining the Comment model
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Define the Comment class by extending the Sequelize Model class
class Comment extends Model { }

// Initialize the Comment model with its attributes and options
Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user', // Reference the user model
                key: 'id', // Use the id column of the referenced model
            },
        },
        post_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'post', // Reference the post model
                key: 'id', // Use the id column of the referenced model
            },
        },
    },
    {
        sequelize, // Use the Sequelize instance for database connection
        freezeTableName: true, // Use the same table name as the model name
        underscored: true,
        modelName: 'comment', // Use comment as the model name in code
    }
);

// Export the Comment model
module.exports = Comment;
