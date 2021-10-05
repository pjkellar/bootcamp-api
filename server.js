const express = require('express');
const dotenv = require('dotenv');

// Route Files
const bootcamps = require('./routes/bootcamps');

// Load ENV variables
dotenv.config({ path: './config/config.env' });

const PORT = process.env.PORT || 5000;

const app = express();

// Mount routers
app.use('/api/v1/bootcamps', bootcamps);

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}!`);
});
