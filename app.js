const express = require('express');
const mongoose = require('mongoose')
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const http = require('http');
const cors = require('cors');
const routes = require('./router');


( async () => {
    try {
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());
        app.use('/api', routes)
        app.use(cors());
        const port = process.env.PORT || 8000
        await mongoose.connect(process.env.DB_URL, {})
        const server = http.createServer(app)
        server.listen(port)
        .on('listening', () => console.log(`App is running on : ${port}`))

        .on('error', (err) => console.log(`An error is happening to connect`, err))
    } catch (error) {
        console.log(`An error is happening to connect Database`)
        process.exit(0)
    }
})()

