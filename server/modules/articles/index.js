var srv_error = require('./../../srv_error.json'),
    db = require('./../db').getPool();

/**
 * Retrieves categories from database
 * @param {Function} callback callback function
 */
let getCategories = (callback) => {
    // retrieve categories
    db.query('SELECT id, name FROM category', [], (err, queryRes) => callback(err, queryRes));
};

/**
 * Adds new article to database for given article object
 * @param {String} user the user id
 * @param {Object} articleObj the article object containing information about the article to add
 * @param {Function} callback callback function
 */
let addArticle = (user, articleObj, callback) => {
    // add the article
    db.query('INSERT INTO article (user, title, description, category, price) VALUES (?, ?, ?, ?, ?)', [
        user, articleObj.title, articleObj.description, articleObj.category, articleObj.price
    ], (err, queryRes) => callback(err, queryRes));
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
        } else res.status(401).json({error: {code: 401, message: srv_error.UNAUTHORIZED}});
    },
    /**
     * addArticle request handler
     * @param {Object} req the server request
     * @param {Object} res the server response
     */
    addArticle: (req, res) => {
        // check if authenticated
        if(req.session.authenticated) {
            // validate params
            if(req.body.article != null && typeof req.body.article.title === 'string' && req.body.article.title.length < 256 && 
                typeof req.body.article.category === 'number' && parseFloat(req.body.article.price)) {
                addArticle(req.session.authenticated, req.body.article, (err, articleRes) => {
                    if(!err && articleRes) res.json({created: true});
                    else res.status(409).json({error: {code: 409, message: err}});
                });
            } else res.status(409).json({error: {code: 409, message: srv_error.INVALID_PARAM}});
        } else res.status(401).json({error: {code: 401, message: srv_error.UNAUTHORIZED}});
    }
};