const express = require('express');
const cors = require('cors');
const { config } = require('./src/config');
const mpesaRoutes = require('./src/routes/mpesa.routes');

const app = express();
app.use(cors({
    origin: 'https://shindapesa-web.vercel.app',
    credentials: true
}));
// Best practice: Enable CORS preflight for all routes
app.options('*', cors());
app.use(express.json());

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

