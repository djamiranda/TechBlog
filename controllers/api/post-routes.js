// Import the necessary modules and setup the router
const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// Route to create a new post with authentication
router.post('/', withAuth, async (req, res) => {
    try {
        // Create a new post using the Post model and the user's session ID
        const newPost = await Post.create({
            ...req.body, // Spread the request body
            user_id: req.session.user_id, // Assign the user's session ID to user_id
        });

        // Respond with the new post
        res.status(200).json(newPost);
    } catch (err) {
        // Handle errors
        res.status(400).json(err);
    }
});

// Route to update a post by ID with authentication
router.put('/:id', withAuth, async (req, res) => {
    console.log(req.body);
    try {
        // Update the post with the provided ID using the request body data
        const postData = await Post.update(req.body, {
            where: {
                id: req.params.id,
            },
        });

        // Check if the post was found and updated
        if (!postData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }

        // Respond with the updated post data
        res.status(200).json(postData);
    } catch (err) {
        // Handle errors
        res.status(500).json(err);
    }
});

// Route to delete a post by ID with authentication
router.delete('/:id', withAuth, async (req, res) => {
    try {
        // Delete the post with the provided ID
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
            },
        });

        // Check if the post was found and deleted
        if (!postData) {
            res.status(404).json({ message: 'No post found with this id.' });
            return;
        }

        // Respond with a success message
        res.status(200).json(postData);
    } catch (err) {
        // Handle errors
        res.status(500).json(err);
    }
});

// Export the router with the defined routes
module.exports = router;
