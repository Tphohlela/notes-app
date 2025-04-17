const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv'); 
const PgPromise = require('pg-promise');
const { auth, requiresAuth } = require('express-openid-connect');
// require('dotenv').config();

const app = express();

// Middleware
app.use(express.json()); // For parsing application/json
app.use(cors()); // Enable CORS for all routes

// Serve static files from the 'client/dist' folder
app.use(express.static(path.join(__dirname, '../client/dist')));

dotenv.config(); 


// Database setup
const DATABASE_URL = process.env.DATABASE_URL;
const dbConfig = {
    connectionString: DATABASE_URL,
  };
const config = {
    authRequired: false,
  auth0Logout: true,
  baseURL: 'https://notes-app-ya4x.onrender.com',
  clientID: 'tGBijhtIejc2DqQsVQrkLE2SmM7AYQBy',
  issuerBaseURL: 'https://dev-u5gsx4bhfio6d05j.us.auth0.com',
  secret: 'LONG_RANDOM_STRING'
    
};

app.use(auth(config));

if (process.env.NODE_ENV === 'production') {

    dbConfig.ssl = {
        rejectUnauthorized: false,
    };
}

const pgp = PgPromise({});
const db = pgp(dbConfig)
const API = require('./api.js')(db); // Import and initialize API with db instance

// API routes
app.post('/api/login', API.loginUser);
app.post('/api/signUp', API.registerUser);
app.post('/api/addNote', API.addNote);
app.get('/api/getNotes',API.getNotes);

app.get('/', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
  });
// Serve your index.html from the dist folder
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});



// app.get('/', (req, res) => {
//     res.send(
//       req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out'
//     )
//   });

  app.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user, null, 2));
  });

// Start the server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
