const express = require('express');
const router = express.Router();

router.use('/student', require('./stdRouter'));


module.exports = router