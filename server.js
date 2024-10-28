const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
let postedData = '';  // Variable to store the POSTed data

// Middleware to parse JSON and form data from POST requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Webhook listener - handle POST requests
app.post('/webhook', (req, res) => {
    postedData = JSON.stringify(req.body, null, 2);  // Format data nicely
    res.status(200).send('Data received!');
});

// Landing page to display the posted data
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API to send the posted data to the front end
app.get('/get-data', (req, res) => {
    res.json({ data: postedData });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
