// Import the User, Post, and Comment models
const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

// Define associations between models

// A user has many posts
User.hasMany(Post, {
    foreignKey: 'user_id', // Create a foreign key user_id in Post model
    onDelete: 'CASCADE', // Delete associated posts when user is deleted
});

// A post belongs to a user
Post.belongsTo(User, {
    foreignKey: 'user_id' // Use the foreign key user_id to link the user
});

// A comment belongs to a user
Comment.belongsTo(User, {
    foreignKey: 'user_id' // Use the foreign key user_id to link the user
});

// A comment belongs to a post
Comment.belongsTo(Post, {
    foreignKey: 'post_id', // Use the foreign key post_id to link the post
});

// A user has many comments
User.hasMany(Comment, {
    foreignKey: 'user_id', // Create a foreign key user_id in Comment model
    onDelete: 'CASCADE', // Delete associated comments when user is deleted
});

// A post has many comments
Post.hasMany(Comment, {
    foreignKey: 'post_id', // Create a foreign key post_id in Comment model
    onDelete: 'CASCADE', // Delete associated comments when post is deleted
});

// Export the User, Post, and Comment models along with their associations
module.exports = {
    User,
    Post,
    Comment
}
