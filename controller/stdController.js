const { studentModel } = require('../model');
const { successHandler, errorHandler } = require('../helper/responseHandler');
const constants = require('../constant/allConstants');
const bcrypt = require('bcrypt');

/**
 * 
 */

const addStudent = async (req, res) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, constants.ROUND)
        const student = await new studentModel(req.body)
        await student.save()
        successHandler(res, constants.CREATE_MSG)
    } catch (error) {
        return errorHandler(res, constants.ERR_MSG)
    }
};

module.exports = { addStudent }
