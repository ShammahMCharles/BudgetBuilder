const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

//Test route
app.get('/', (req, res) => {
  res.json({
    message: 'API is running'});
});

//Start sever
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

