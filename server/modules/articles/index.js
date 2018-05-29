var srv_error = require('./../../srv_error.json'),
    db = require('./../db').getPool();

/**
 * Retrieves categories from database
 * @param {Function} callback callback function
 */
let getCategories = (callback) => {
    // retrieve categories
    db.query('SELECT name FROM category', [], (err, queryRes) => callback(err, queryRes));
};

/**
 * Articles module
 */
module.exports = {
    /**
     * getCategories request handler
     * @param {Object} req the server request
     * @param {Object} res the server response
     */
    getCategories: (req, res) => {
        // check if authenticated
        if(req.session.authenticated) {
            getCategories((err, categoryRes) => {
                if(!err && categoryRes) res.json({categories: categoryRes});
                else res.status(409).json({error: {code: 409, message: err}});
            });
        } else res.status(401).json({error: {code: 401, message:srv_error.UNAUTHORIZED}});
    } 
};