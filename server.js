const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan'); //Logging middleware
const colors = require('colors');
const fileUpload = require('express-fileupload');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

// Load ENV variables
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

// Route Files
const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');
const auth = require('./routes/auth');

const PORT = process.env.PORT || 5000;

const app = express();

// Body Parser
app.use(express.json());

// Dev Logging Middleware (ONLY RUN IN DEV)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(fileUpload());

//Set Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Mount routers
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);
app.use('/api/v1/auth', auth);

app.use(errorHandler);

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
