const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

//Load the variabels
dotenv.config({ path: './config/config.env' });

//Load models
const Bootcamp = require('./models/Bootcamp.js');
const Course = require('./models/Course.js');

//Connect to DB
mongoose.connect(process.env.MONGO_URI);

//Read JSON Files
const bootcamps = JSON.parse(
  fs.readFileSync(path.join(__dirname, '_data', 'bootcamps.json'), 'UTF-8')
);

//Read JSON Files
const courses = JSON.parse(
  fs.readFileSync(path.join(__dirname, '_data', 'courses.json'), 'UTF-8')
);

// Import into DB
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    //await Course.create(courses);
    console.log('Data Imported...'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    await Course.deleteMany();
    console.log('Data Destroyed...'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// argument in the terminal ex: "node seeder -i"
if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
