const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const app = express();
const cors = require('cors');

// Connect to database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors());

// Define API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// Serve static assets from the 'public' directory
app.use(express.static(path.join(__dirname, '..', 'frontend', 'public')));

// Catch-all route for any non-API GET requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'public', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
