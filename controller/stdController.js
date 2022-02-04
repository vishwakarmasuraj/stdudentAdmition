const { studentModel } = require('../model');
const { successHandler, errorHandler } = require('../helper/responseHandler');
const allConstants = require('../constant/allConstants');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */

const addStudent = async (req, res) => {
    try {
        req.body.password = await bcrypt.hashSync(req.body.password, allConstants.ROUND)
        const student = await new studentModel(req.body);
        await student.save();
        successHandler(res, 201, allConstants.CREATE_MSG);
    } catch (error) {
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

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */

const getStudent = async (req, res) => {
    try {
        const result = await studentModel.find({}).select('-password')
        successHandler(res, 200, allConstants.GET_MSG, result)
    } catch (error) {
        return errorHandler(res, 500, allConstants.ERR_MSG);
    };
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */

const studentSearchByRecord = async (req, res) => {
    try {
        const { search = '' } = req.query
        const result = await studentModel.find({
            $or: [
                { $or: [{ name: { $regex: `${ search }`, $options: 'i' } }] },
                { $or: [{ lastName: { $regex: `${ search }`, $options: 'i' } }] },
                { $or: [{ email: search }] },
                { $or: [{ branch: search }] },
                { $or: [{ status: search }] }
            ]
        }).select('-password')
        successHandler(res, 200,allConstants.GET_MSG, result);
    } catch (error) {
        return errorHandler(res, 500, allConstants.ERR_MSG)
    }
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */

const studentRecord = async (req, res) => {
    try {
        let { startDate, endDate } = req.query
        if (!startDate || !endDate) {
            return errorHandler(res, 400, allConstants.UPDATE_RECORD_ERR)
        }
        const result = await studentModel.find({ dateOfJoining: { $gte: new Date(startDate).setHours(00, 00, 00), $lt: new Date(endDate).setHours(23, 59, 59) } }).sort({ dateOfJoining: 'asc' }).select('-password');
        successHandler(res, 200, allConstants.GET_MSG, result)
    } catch (error) {
        return errorHandler(res, 500, allConstants.ERR_MSG)
    }
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */

const studentUpdate = async (req, res) => {
    try {
        const id = req.params.id
        const stdUpdate = await studentModel.findByIdAndUpdate({ _id: id }, { $set: req.body })
        successHandler(res, 200, allConstants.UPDATE_MSG, stdUpdate)
    } catch (error) {
        return errorHandler(res, 500, allConstants.ERR_MSG)
    }
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */

const delStudent = async (req, res) => {
    try {
        const id = req.params.id
        const result = await studentModel.findOneAndRemove({ _id: id })
        successHandler(res, 200, allConstants.DEL_MSG, result)
    } catch (error) {
        return errorHandler(res, 500, allConstants.ERR_MSG)
    }
};

module.exports = { addStudent, userLogin, getStudent, studentUpdate, delStudent, studentSearchByRecord, studentRecord }
