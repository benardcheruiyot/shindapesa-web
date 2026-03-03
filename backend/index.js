const express = require('express');
const cors = require('cors');
const { config } = require('./src/config');
const mpesaRoutes = require('./src/routes/mpesa.routes');

const app = express();
app.use(express.json()); // Always first

app.use(cors({
    origin: true, // For debugging; use your domain for production
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    preflightContinue: false
}));
app.options('*', cors());

// Manual fallback for OPTIONS requests
app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        return res.sendStatus(200);
    }
    next();
});

const PORT = config.port;

// Health check
app.get('/', (req, res) => res.send('Shindapesa API is running'));

// Routes
app.use('/', mpesaRoutes);

// Centralized error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));

