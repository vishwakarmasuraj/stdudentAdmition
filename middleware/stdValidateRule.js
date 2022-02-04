const { studentModel } = require('../model');
const { body } = require('express-validator');

/**
 * 
 * @returns 
 */

const studentValidateRule = () => {
    return [
        body('title').notEmpty().isAlpha().withMessage('Title should be alphabetical'),
        body('name').notEmpty().withMessage('Please enter name'),
        body('lastName').notEmpty(),
        body('email').notEmpty()
            .custom(value => {
                return studentModel.findOne({ email: value }).then(user => {
                    if (user) {
                        return Promise.reject('email is already exist')
                    }
                })
            }).isEmail().withMessage('email should be email type'),
        body('password').notEmpty().isLength({ min: 8 }),
        body('branch').notEmpty(),
        body('mobile').notEmpty().isLength({ min: 10, max: 10 }),
        body('dateOfJoining').notEmpty(),
        body('dateOfComplete').notEmpty(),
        body('status').notEmpty()
    ]
}

module.exports = { studentValidateRule }