const express = require('express');
const connectDB = require('./database/db');
const cors = require('cors');
const dotenv = require('dotenv');
const routes = require('./routes/routes');
const path = require('path');

dotenv.config();

const app = express();

// Connect to DB (non-blocking)
connectDB().then((connected) => {
  if (connected) {
    console.log('✅ Database connection established');
  } else {
    console.log('⚠️  Running without database connection');
  }
});

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Backend API routes
app.use('/api', routes); // Assuming you use '/api' as prefix

// Serve static files from frontend
const frontendPath = path.join(__dirname, '../Frontend/dist');
const fs = require('fs');

// Check if frontend dist exists, if not try alternative paths
let actualFrontendPath = frontendPath;
if (!fs.existsSync(frontendPath)) {
  console.log('Frontend dist not found at:', frontendPath);
  // Try alternative paths for Render deployment
  const altPaths = [
    path.join(__dirname, '../../Frontend/dist'),
    path.join(process.cwd(), 'Frontend/dist'),
    path.join(process.cwd(), 'dist')
  ];
  
  for (const altPath of altPaths) {
    if (fs.existsSync(altPath)) {
      actualFrontendPath = altPath;
      console.log('Found frontend at:', actualFrontendPath);
      break;
    }
  }
}

app.use(express.static(actualFrontendPath));

// Catch-all to serve index.html for React Router
app.get('*', (req, res) => {
  const indexPath = path.join(actualFrontendPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Frontend not built. Please run the build process.');
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
