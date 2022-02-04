/**
 * exports all constants message via module.exports
 */
const allConstants = Object.freeze({
    ROUND: 10,
    CREATE_MSG: 'Successfully created',
    GET_MSG: 'Found students record',
    UPDATE_MSG: 'Successfully updated',
    DEL_MSG: 'Successfully deleted',
    ERR_MSG: 'Something went wrong',
    EMAIL_NOT_FOUND: 'Please enter valid email',
    WRONG_PASSWORD: 'Wrong password',
    NOT_ENTER_EMAIL_PASS: 'Please enter valid email and password',
    UPDATE_RECORD_ERR: 'please ensure, you have mentioned required field',
    LOGIN_SUCCESS: 'Logged in successfully, Redirect to dashboard',
    ADMIN_LOGIN_SUCCESS: 'Admin Logged in successfully'
});

module.exports = allConstants
