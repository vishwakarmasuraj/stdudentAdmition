const { studentModel } = require('../model');
const { successHandler, errorHandler } = require('../helper/responseHandler');
const constants = require('../constant/allConstants');
const bcrypt = require('bcrypt');

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */

const addStudent = async (req, res) => {
    try {
        req.body.password = await bcrypt.hashSync(req.body.password, constants.ROUND)
        const student = await new studentModel(req.body)
        await student.save()
        successHandler(res, constants.CREATE_MSG)
    } catch (error) {
        return errorHandler(res, constants.ERR_MSG)
    }
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
        successHandler(res, constants.GET_MSG, result)
    } catch (error) {
        return errorHandler(res, constants.ERR_MSG)
    }
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
        successHandler(res, constants.GET_MSG, result)
    } catch (error) {
        return errorHandler(res, constants.ERR_MSG)
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
            res.status(400).json({ message: 'please ensure, you have mentioned required field' })
        }
        const result = await studentModel.find({ dateOfJoining: { $gte: new Date(startDate).setHours(00, 00, 00), $lt: new Date(endDate).setHours(23, 59, 59) } }).sort({ dateOfJoining: 'asc' }).select('-password');
        successHandler(res, constants.GET_MSG, result)
    } catch (error) {
        return errorHandler(res, constants.ERR_MSG)
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
        successHandler(res, constants.UPDATE_MSG, stdUpdate)
    } catch (error) {
        return errorHandler(res, constants.ERR_MSG)
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
        await studentModel.findOneAndRemove({ _id: id })
        successHandler(res, constants.DEL_MSG)
    } catch (error) {
        return errorHandler(res, constants.ERR_MSG)
    }
};

module.exports = { addStudent, getStudent, studentUpdate, delStudent, studentSearchByRecord, studentRecord }
