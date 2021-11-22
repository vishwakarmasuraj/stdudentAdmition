const express = require('express');
const router = express.Router();

const { stdValidRule, valid } = require('../middleware'),
    { stdController } = require('../controller');

router.post('/create-student', stdValidRule.studentValidateRule(), valid.validate, stdController.addStudent)


module.exports = router