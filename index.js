const express = require('express');
require('dotenv').config();
const cors = require('cors')
const { dbConnection } = require('./db/config')

// Crear el servidor express
const app = express();

// database
dbConnection();

// cors
app.use(cors());

// Public
app.use( express.static('public') );

// Parse body
app.use( express.json() );

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

// listening
app.listen( process.env.PORT, () => {
    console.log(`Server run ${process.env.PORT}`)
})