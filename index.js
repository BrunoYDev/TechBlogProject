const express = require('express');
const app = express();
const connection = require('./database/database');

// Change view engine to ejs
app.set('view engine', 'ejs');

// Create static folder(for images, files etc)
app.use(express.static('public'));

// use urlEncode for EJS files
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Connect to database
connection.authenticate().then(() => {
    console.log('DB connection stabilished');
}).catch((error) => {
    console.log(error);
});

// Routes:

app.get('/',(req,res) => {
    res.render('index');
});


// Initialize Server
app.listen(8080, () => {
    console.log('Server running at: http://localhost:8080');
});
