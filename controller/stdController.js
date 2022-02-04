const { studentModel } = require('../model');
const { successHandler, errorHandler } = require('../helper/responseHandler');
const allConstants = require('../constant/allConstants');

const getStudent = async (req, res) => {
    try {
        const result = await studentModel.find({}).select('-password')
        successHandler(res, 200, allConstants.GET_MSG, result)
    } catch (error) {
        return errorHandler(res, 500, allConstants.ERR_MSG);
    };
};

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

const studentUpdate = async (req, res) => {
    try {
        const id = req.params.id
        const stdUpdate = await studentModel.findByIdAndUpdate({ _id: id }, { $set: req.body })
        successHandler(res, 200, allConstants.UPDATE_MSG, stdUpdate)
    } catch (error) {
        return errorHandler(res, 500, allConstants.ERR_MSG)
    }
};

const delStudent = async (req, res) => {
    try {
        const id = req.params.id
        const result = await studentModel.findOneAndRemove({ _id: id })
        successHandler(res, 200, allConstants.DEL_MSG, result)
    } catch (error) {
        return errorHandler(res, 500, allConstants.ERR_MSG)
    }
};

module.exports = { 
    getStudent, 
    studentUpdate, 
    delStudent, 
    studentSearchByRecord, 
    studentRecord 
}
