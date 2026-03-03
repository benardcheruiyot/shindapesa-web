const express = require('express');
const cors = require('cors');
const { config } = require('./src/config');
const mpesaRoutes = require('./src/routes/mpesa.routes');

const app = express();
app.use(express.json()); // Always first



const allowedOrigins = [
    'https://shindapesa-lttc96cmk-bens-projects-60fa57a1.vercel.app',
    'http://localhost:3000',
];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(null, false);
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Wildcard fallback for debugging (remove in production)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});



// Health check
app.get('/', (req, res) => res.send('Shindapesa API is running'));

// Routes
app.use('/', mpesaRoutes);

// Centralized error handling
app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).json({ error: 'Something went wrong!' });
});

// Explicit CORS fallback for OPTIONS requests
app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Origin', 'https://shindapesa-lttc96cmk-bens-projects-60fa57a1.vercel.app');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.header('Access-Control-Allow-Credentials', 'true');
        return res.sendStatus(200);
    }
    next();
});

// Always use process.env.PORT directly for Render compatibility
async function startServer() {
    try {
        if (typeof sql === 'function') {
            await sql`SELECT 1`;
            console.log('✅ Database connection successful');
        }
        const port = process.env.PORT;
        app.listen(port, () => console.log(`Backend running on port ${port}`));
    } catch (err) {
        console.error('❌ Startup error:', err);
        process.exit(1);
    }
}
startServer();

