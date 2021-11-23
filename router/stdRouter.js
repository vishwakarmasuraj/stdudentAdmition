const express = require('express');
const router = express.Router();

const { stdValidRule, valid } = require('../middleware'),
    { stdController } = require('../controller');

router.post('/create-student', stdValidRule.studentValidateRule(), valid.validate, stdController.addStudent);

router.get('/get-student', stdController.getStudent);

router.get('/search', stdController.studentSearchByRecord)

router.put('/update-student/:id', stdController.studentUpdate)

router.delete('/delete-student/:id', stdController.delStudent)

module.exports = router