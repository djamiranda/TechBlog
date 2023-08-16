// Import required modules & packages
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Import routes, db connection & helper functions
const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');

// Initialize Express app and define port
const app = express();
const PORT = process.env.PORT || 3001;

// Configure session options
const sess = {
    secret: 'Super secret secret', // Secret key for session
    cookie: {
        maxAge: 15 * 60 * 1000 // Timeout after 15 minutes
    },
    resave: false, // Don't save session if nothing is modified
    saveUninitialized: true, // Save a new session but not modified one
    store: new SequelizeStore({
        db: sequelize // Use sequelize to store session data
    })
};

// Use session middleware with configured options
app.use(session(sess));

// Create instance of Handlebars with custom helper functions
const hbs = exphbs.create({ helpers });

// Set Handlebars as the view engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Parse incoming JSON and URL encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Use defined routes
app.use(routes);

// Sync sequelize models to the db and start the server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening 🚀'));
});
