const express = require('express');
const router = express.Router();

/**
 * 
 */
const { stdValidRule, valid } = require('../middleware');
const { authController } = require('../controller');

/**
 * 
 */
router.post('/create-student', stdValidRule.studentValidateRule(), valid.validate, authController.addStudent);

/**
 * 
 */
router.post('/login', authController.userLogin)


module.exports = router
