import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import connectDB from './db';

// Load the env variables
dotenv.config();

// Create a instance of the express app
const app = express();

// Serve the react frontend code on the server
app.use(express.static(path.join(__dirname, '../client/dist')));

// Catch-all route to serve React's index.html for client-side routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

// Parse all input as json
app.use(express.json());

// Connect to the database
connectDB();

// Start listening on the port
const port = process.env.PORT;

app.listen(port, () => {

    console.log(`Listening on port ${port}`);

});