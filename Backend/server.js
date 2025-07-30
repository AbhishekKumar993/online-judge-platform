const express = require('express');
const connectDB = require('./database/db');
const cors = require('cors');
const dotenv = require('dotenv');
const routes = require('./routes/routes');
const path = require('path');

dotenv.config();

const app = express();

// Connect to DB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Backend API routes
app.use('/api', routes); // Assuming you use '/api' as prefix

// Serve static files from frontend
const frontendPath = path.join(__dirname, '../Frontend/dist');
app.use(express.static(frontendPath));

// Catch-all to serve index.html for React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
