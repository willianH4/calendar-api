const express = require('express');
require('dotenv').config();

// Crear el servidor express
const app = express();

// Public
app.use( express.static('public') );

// Parse body
app.use( express.json() );

// Routes
app.use('/api/auth', require('./routes/auth'));
// TODO: CRUD: eventos

// listening
app.listen( process.env.PORT, () => {
    console.log(`Server run ${process.env.PORT}`)
})