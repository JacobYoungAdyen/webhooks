// const express = require('express');
// const bodyParser = require('body-parser');
// const path = require('path');

// const app = express();
// let postedData = '';  // Variable to store the POSTed data

// const { MongoClient } = require('mongodb');

// async function main() {
//     // we'll add code here soon
//     const uri = "mongodb+srv://jacobyoung:oWtx9JSCLwP4In9V@webhooklistener.ltq2b.mongodb.net/?retryWrites=true&w=majority&appName=WebhookListener"
//     const client = new MongoClient(uri);

//     try {
//         await client.connect();
    
//         await listDatabases(client);
    
//     } catch (e) {
//         console.error(e);
//     }
//     finally {
//         await client.close();
//     }
// }

// main().catch(console.error);

// async function listDatabases(client){
//     databasesList = await client.db().admin().listDatabases();

//     console.log("Databases:");
//     databasesList.databases.forEach(db => console.log(` - ${db.name}`));
// };


// // Middleware to parse JSON and form data from POST requests
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // Serve static files from the "public" folder
// app.use(express.static(path.join(__dirname, 'public', 'index.html')));

// // Webhook listener - handle POST requests
// app.post('/webhook', (req, res) => {
//     postedData = JSON.stringify(req.body, null, 2);  // Format data nicely
//     res.status(200).send('Data received!');
// });

// // Landing page to display the posted data
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// // API to send the posted data to the front end
// app.get('/get-data', (req, res) => {
//     res.json({ data: postedData });
// });

// // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });
