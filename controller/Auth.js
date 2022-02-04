const { studentModel } = require('../model');
const { successHandler, errorHandler } = require('../helper/responseHandler');
const {allConstants} = require('../constant');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const addStudent = async (req, res) => {
    try {
        req.body.password = await bcrypt.hashSync(req.body.password, allConstants.ROUND)
        const student = await new studentModel(req.body);
        await student.save();
        successHandler(res, 201, allConstants.CREATE_MSG);
    } catch (error) {
        console.log(error)
        return errorHandler(res, 500, allConstants.ERR_MSG);
    };
};

const generateToken = (user) => {
    return jwt.sign({data: user}, process.env.SECRET_KEY, {
        expiresIn: 8600
    });
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */

const userLogin = async (req, res) => {
    try {
        let {email, password} = req.body 
        if (!email || !password) {
            return errorHandler(res, 400, allConstants.NOT_ENTER_EMAIL_PASS)
        }
        let data = await studentModel.findOne({email: email});
        if (!data){
            return errorHandler(res, 400, allConstants.EMAIL_NOT_FOUND);
        };
        let checkPassword = await bcrypt.compare(password, data.password);
        if (!checkPassword){
            return errorHandler(res, 400, allConstants.WRONG_PASSWORD);
        }else {
            return successHandler(res, 200, allConstants.LOGIN_SUCCESS, {
                token : generateToken(data),
                data
            });
        };
    } catch (error) {
        return errorHandler(res, 500, allConstants.ERR_MSG);
    };
};

module.exports = {
    addStudent,
    userLogin
}