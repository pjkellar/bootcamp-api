const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan'); //Logging middleware
const colors = require('colors');
const connectDB = require('./config/db');

// Load ENV variables
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

// Route Files
const bootcamps = require('./routes/bootcamps');

const PORT = process.env.PORT || 5000;

const app = express();

// Body Parser
app.use(express.json());

// Dev Logging Middleware (ONLY RUN IN DEV)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routers
app.use('/api/v1/bootcamps', bootcamps);

const server = app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${PORT}!`.yellow.bold
  );
});

// Handle unhandeled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Whoops! Looks like there was an error: ${err.message}`.red);
  // Close server and exit process
  server.close(() => {
    process.exit(1);
  });
});
