const express = require('express');

// Crear el servidor express
const app = express();

// Public
app.use( express.static('public') );

// Routes
// app.get('/', (req, res) => {
//     res.json({
//         ok: true
//     })
// });

// listening
app.listen( 4000, () => {
    console.log(`Server run ${4000}`)
})