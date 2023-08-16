// Import the necessary modules and setup the router
const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Route to display the users dashboard
router.get('/', (req, res) => {
    // Find all posts associated with the logged in user
    Post.findAll({
        include: [
            {
                model: User // Include the User model for user details
            }
        ],
        where: {
            user_id: req.session.user_id // Filter posts by the users session ID
        }
    }).then((posts) => {
        // Map the posts to plain objects for rendering
        posts = posts.map((post) => post.get({ plain: true }));
        // Render the dashboard view with the retrieved posts
        res.render('dashboard', { posts });
    });
});

// Export the router with the defined route
module.exports = router;
