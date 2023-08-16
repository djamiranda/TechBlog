// Import the necessary modules and setup the router
const router = require('express').Router();

// Import user-related routes
const userRoutes = require('./user-routes');

// Import post-related routes
const postRoutes = require('./post-routes');

// Import comment-related routes
const commentRoutes = require('./comment-routes');

// Set up routes using middleware
// Mount user routes under '/users'
router.use('/users', userRoutes);

// Mount post routes under '/posts'
router.use('/posts', postRoutes);

// Mount comment routes under '/comments'
router.use('/comments', commentRoutes);

// Export the router with all the mounted routes
module.exports = router;
