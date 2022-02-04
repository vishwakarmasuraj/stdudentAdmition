const express = require('express');
const router = express.Router();

/**
 * 
 */
const { stdController } = require('../controller');

/**
 * 
 */
router.get('/get-student', stdController.getStudent);

/**
 * 
 */
router.get('/search', stdController.studentSearchByRecord)

/**
 * 
 */
router.get('/status', stdController.studentRecord)

/**
 * 
 */
router.put('/update-student/:id', stdController.studentUpdate)

/**
 * 
 */
router.delete('/delete-student/:id', stdController.delStudent)

module.exports = router