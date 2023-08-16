// Import the necessary modules and setup the router
const express = require('express');
const router = express.Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Route to display all posts on the home page
router.get('/', (req, res) => {
    // Find all posts including associated User data
    Post.findAll({
        include: [
            {
                model: User
            }
        ]
    }).then((posts) => {
        console.log(posts); // Log the retrieved posts
        // Map the posts to plain objects for rendering
        posts = posts.map((post) => post.get({ plain: true }));
        // Render the home view with the posts and session status
        res.render('home', { posts, loggedIn: req.session.loggedIn });
    });
});

// Route to display login page
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/'); // Redirect to home page if already logged in
        return;
    }
    res.render('login'); // Render the 'login' view
});

// Route to display signup page
router.get('/signup/', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/'); // Redirect to home page if already logged in
        return;
    }
    res.render('signup'); // Render the signup view
});

// Route to display a specific post and its comments
router.get('/posts/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: User
            },
            {
                model: Comment
            }
        ]
    }).then((post) => {
        if (!post) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        post = post.get({ plain: true });
        // Render the edit-post view with the post and session status
        res.render('edit-post', { post, loggedIn: req.session.loggedIn });
    });
});

// Route to display the user's dashboard
router.get('/dashboard', withAuth, (req, res) => {
    // Find all posts associated with the logged-in user
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        include: [
            {
                model: User
            }
        ]
    }).then((posts) => {
        posts = posts.map((post) => post.get({ plain: true }));
        // Render the dashboard view with the user's posts and session status
        res.render('dashboard', { posts, loggedIn: req.session.loggedIn });
    });
});

// Route to display a specific post and its comments for adding a new comment
router.get('/comment/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: User
            },
            {
                model: Comment,
                include: [
                    {
                        model: User
                    }
                ]
            }
        ]
    }).then((post) => {
        if (!post) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        post = post.get({ plain: true });
        // Render the comment view with the post and session status
        res.render('comment', { post, loggedIn: req.session.loggedIn });
    });
});

// Route to display a specific comment for editing
router.get('/edit-comment/:id', withAuth, (req, res) => {
    Comment.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: User
            },
        ]
    }).then((comment) => {
        if (!comment) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
        }
        comment = comment.get({ plain: true });
        // Render the edit-comment view with the comment and session status
        res.render('edit-comment', { comment, loggedIn: req.session.loggedIn });
    });
});

// Route to log out the user
router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/'); // Redirect to home page after logging out
    });
});

// Export the router with the defined routes
module.exports = router;
