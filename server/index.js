const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv'); 
const PgPromise = require('pg-promise');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json()); // For parsing application/json
app.use(cors()); // Enable CORS for all routes

// Serve static files from the 'client/dist' folder
app.use(express.static(path.join(__dirname, '../client/dist')));

dotenv.config(); 

// Database setup
const DATABASE_URL = process.env.DATABASE_URL;
const config = {
    connectionString: DATABASE_URL,
};

console.log('Database URL:', process.env.DATABASE_URL);


if (process.env.NODE_ENV === 'production') {
    config.ssl = {
        rejectUnauthorized: false,
    };
}

const pgp = PgPromise({});
const db = pgp(config);
const API = require('./api.js')(db); // Import and initialize API with db instance

// API routes
app.post('/api/login', API.loginUser);
app.post('/api/signUp', API.registerUser);
app.post('/api/addNote', API.addNote);
app.get('/api/getNotes',API.getNotes);


// Serve your index.html from the dist folder
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

