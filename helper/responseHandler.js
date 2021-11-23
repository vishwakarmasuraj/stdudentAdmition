/**
 * 
 * @param {*} res it is response object that is used for sending response.
 * @param {*} message used for showing message.
 * @param {*} result  it contain all output results in it.
 */
const successHandler = (res, message, result) => {
    res.status(200).json({ message, result })
}

/**
 * 
 * @param {*} res it's is response object that is used for sending response.
 * @param {*} message used for showing message.
 * @param {*} error it contain all output results in it.
 */
const errorHandler = (res, message, error) => {
    res.status(500).json(message, error)
}

module.exports = { successHandler, errorHandler }