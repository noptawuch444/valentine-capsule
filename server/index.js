const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Middlewares
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes('*')) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));
app.use(express.json());

// Database Setup
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

const generatePublicCode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 3; i++) code += chars.charAt(Math.floor(Math.random() * chars.length));
    code += '-';
    for (let i = 0; i < 3; i++) code += chars.charAt(Math.floor(Math.random() * chars.length));
    return code;
};

// Initialize Database Table
const initDb = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS templates (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                public_code TEXT UNIQUE NOT NULL,
                config JSONB NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('Database initialized');
    } catch (err) {
        console.error('Error initializing database:', err);
    }
};

if (process.env.DATABASE_URL) {
    initDb();
}

// Routes
app.get('/api/templates', async (req, res) => {
    try {
        const result = await pool.query('SELECT *, public_code AS "publicCode" FROM templates ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/templates/:code', async (req, res) => {
    try {
        const result = await pool.query('SELECT *, public_code AS "publicCode" FROM templates WHERE public_code = $1', [req.params.code]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Template not found' });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/templates', async (req, res) => {
    const { name, config, publicCode } = req.body;
    const code = publicCode || generatePublicCode();
    try {
        const result = await pool.query(
            'INSERT INTO templates (name, public_code, config) VALUES ($1, $2, $3) RETURNING *, public_code AS "publicCode"',
            [name, code, config]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/templates/:id', async (req, res) => {
    const { name, config } = req.body;
    try {
        const result = await pool.query(
            'UPDATE templates SET name = $1, config = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *, public_code AS "publicCode"',
            [name, config, req.params.id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/templates/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM templates WHERE id = $1', [req.params.id]);
        res.json({ message: 'Template deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/upload', upload.single('image'), async (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    try {
        const fileStr = req.file.buffer.toString('base64');
        const uploadResponse = await cloudinary.uploader.upload(`data:${req.file.mimetype};base64,${fileStr}`, {
            folder: 'valentine_memories',
            resource_type: 'auto'
        });
        res.json({ url: uploadResponse.secure_url });
    } catch (err) {
        console.error('Cloudinary upload error:', err);
        res.status(500).json({ error: 'Upload failed' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
