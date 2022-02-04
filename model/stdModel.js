const { Schema, model } = require('mongoose');

/**
 * student model Schema 
 */
const stdSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        enum: ['CSE', 'IT', 'ME', 'CE', 'EC']
    },
    mobile: {
        type: String,
        required: true
    },
    dateOfJoining: {
        type: Date,
        default: Date.now,
        required: true
    },
    dateOfComplete: {
        type: Date,
        required: true

    },
    status: {
        type: String,
        required: true,
        enum: ['active', 'inactive']
    }
}, { timestamps: true })

module.exports = model('Student', stdSchema)