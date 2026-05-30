require('dotenv').config({ path: '../../backend/.env' }); // Load legacy env for now
const express = require('express');
const cors = require('cors');
const http = require('http');
const initializeSocket = require('./socket');

const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());

// Basic health check route
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', service: 'communication-service' });
});

const server = http.createServer(app);

// Initialize Socket.io
const io = initializeSocket(server);

server.listen(PORT, () => {
    console.log(`Communication Service running on port ${PORT}`);
});
