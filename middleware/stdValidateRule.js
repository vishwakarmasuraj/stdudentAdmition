const { studentModel } = require('../model');
const { body } = require('express-validator');

const studentValidateRule = () => {
    return [
        body('title').notEmpty(),
        body('name').notEmpty()
            .custom(value => {
                return studentModel.findOne({ name: value }).then(user => {
                    if (user) {
                        return Promise.reject('name is already exist')
                    }
                })
            }),
        body('lastName').notEmpty(),
        body('email').notEmpty()
            .custom(value => {
                return studentModel.findOne({ email: value }).then(user => {
                    if (user) {
                        return Promise.reject('email is already exist')
                    }
                })
            }),
        body('password').notEmpty().isLength({ min: 6 }),
        body('branch').notEmpty(),
        body('dateOfJoining').notEmpty(),
        body('dateOfComplete').notEmpty(),
        body('status').notEmpty()
    ]
}

module.exports = { studentValidateRule }