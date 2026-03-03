const express = require('express');
const cors = require('cors');
const { config } = require('./src/config');
const mpesaRoutes = require('./src/routes/mpesa.routes');

const app = express();
app.use(express.json()); // Always first


const FRONTEND_ORIGIN = 'https://shindapesa-lttc96cmk-bens-projects-60fa57a1.vercel.app';
app.use(cors({
    origin: FRONTEND_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
// Automatically handles OPTIONS preflight


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

// Robust startup error logging
async function startServer() {
    try {
        // Test DB connection (if needed)
        if (typeof sql === 'function') {
            await sql`SELECT 1`;
            console.log('✅ Database connection successful');
        }
        app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
    } catch (err) {
        console.error('❌ Startup error:', err);
        process.exit(1);
    }
}
startServer();

