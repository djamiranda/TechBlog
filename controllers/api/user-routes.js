// Import the necessary modules and setup the router
const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');

// Route to create a new user
router.post('/', async (req, res) => {
    try {
        // Create a new user using the request body data
        const userData = await User.create(req.body);

        // Save user session data and respond with user data
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.loggedIn = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        // Handle errors
        res.status(400).json(err);
    }
});

// Route to log in a user
router.post('/login', async (req, res) => {
    try {    
        // Find a user by their username
        const userData = await User.findOne({ where: { username: req.body.username } });

        // If no user found, return an error message
        if (!userData) {
            res.status(400).json({ message: 'Incorrect username or password, please try again' });
            return;
        }

        // Check if the provided password is valid
        const validPassword = await userData.checkPassword(req.body.password);

        // If password is invalid, return an error message
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect username or password, please try again' });
            return;
        }

        // Save user session data and respond with success message and user data
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.loggedIn = true;

            res.status(200).json({ user: userData, message: 'You are now logged in!' });
        });
    } catch (err) {
        // Handle errors
        console.log(err);
        res.status(400).json(err);
    }
});

// Route to log out a user
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        // Destroy the user's session and respond with a successful status
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        // If user is not logged in, respond with an error status
        res.status(404).end();
    }
});

// Export the router with the defined routes
module.exports = router;
