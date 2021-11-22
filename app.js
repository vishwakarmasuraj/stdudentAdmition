const express = require('express');
const mongoose = require('mongoose')
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const port = process.env.PORT

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(process.env.DATABASE_CONNECTION).then(() => {
    console.log('Successfully connected to database');
    app.listen(port, () => console.log(`Server is listening at ${ port }`))
})

