// Import necessary modules for defining the User model
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

// Define the User class by extending the sequelize model class
class User extends Model {
    // Method to check if a provided password matches the users stored password
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

// Initialize the User model with its attributes and options
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8], // Password length must be at least 8 characters
            },
        },
    },
    {
        hooks: {
            // Hash the password before creating a new user
            beforeCreate: async (newUserData) => {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            // Hash the password before updating a users password
            beforeUpdate: async (updatedUserData) => {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            },
        },
        sequelize, // Use the Sequelize instance for database connection
        timestamps: false, // Disable automatic timestamp columns
        freezeTableName: true, // Use the same table name as the model name
        underscored: true, 
        modelName: 'user', // Use user as the model name in code
    }
);

// Export the User model
module.exports = User;
