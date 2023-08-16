// Import the necessary modules and setup the router
const router = require('express').Router();

// Import routes for different sections
const homeRoutes = require('./home-routes.js');
const apiRoutes = require('./api/index.js');
const dashboardRoutes = require('./dashboard-routes.js');

// Use the imported routes under their respective endpoints
router.use('/', homeRoutes); // Mount home routes under /
router.use('/dashboard', dashboardRoutes); // Mount dashboard routes under /dashboard
router.use('/api', apiRoutes); // Mount API routes under /api

// Route to handle 404 errors
router.use((req, res) => {
    res.status(404).end();
});

// Export the router with the defined routes
module.exports = router;
