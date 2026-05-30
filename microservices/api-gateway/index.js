const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(morgan('dev'));

// Routing configuration
// Communication Service (Handles /api/chat and socket.io)
const COMMUNICATION_SERVICE_URL = process.env.COMMUNICATION_SERVICE_URL || 'http://communication-service:5002';

// Legacy Monolith
const LEGACY_BACKEND_URL = process.env.LEGACY_BACKEND_URL || 'http://legacy-backend:5001';

// 1. Proxy WebSockets to the communication service
app.use('/socket.io', createProxyMiddleware({
    target: COMMUNICATION_SERVICE_URL,
    ws: true,
    changeOrigin: true
}));

// 2. Proxy chat routes to the communication service
// Startups Chat Endpoints (from UC_34 and UC_41)
app.use('/api/startups/chat', createProxyMiddleware({
    target: COMMUNICATION_SERVICE_URL,
    changeOrigin: true
}));

// Add any other chat routes here if they exist
app.use('/api/chat', createProxyMiddleware({
    target: COMMUNICATION_SERVICE_URL,
    changeOrigin: true
}));

// 3. Proxy everything else to the legacy monolith
app.use('/', createProxyMiddleware({
    target: LEGACY_BACKEND_URL,
    changeOrigin: true
}));

app.listen(PORT, () => {
    console.log(`API Gateway is running on port ${PORT}`);
    console.log(`Routing WebSockets and /api/chat to ${COMMUNICATION_SERVICE_URL}`);
    console.log(`Routing all other traffic to ${LEGACY_BACKEND_URL}`);
});
