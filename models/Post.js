// Import necessary modules for defining the Post model
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Define the Post class by extending the Sequelize Model class
class Post extends Model { }

// Initialize the Post model with its attributes and options
Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
        },
        contents: {
            type: DataTypes.STRING,
        },
        date_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user', // Reference the user model
                key: 'id', // Use the id column of the referenced model
            },
        },
    },
    {
        sequelize, // Use the Sequelize instance for database connection
        freezeTableName: true, // Use the same table name as the model name
        underscored: true, 
        modelName: 'post', // Use post as the model name in code
    }
);

// Export the Post model
module.exports = Post;
