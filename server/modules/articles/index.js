var srv_error = require('./../../srv_error.json'),
    db = require('./../db');

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
 * Retrieves articles from databases that matches optional search term
 * @param {String} user the user id
 * @param {Object} [searchObj] optional search object containing search terms such as title to search for
 * @param {Function} callback callback function
 */
let getArticles = (user, searchObj, callback) => {
    // ensure that search object is an object
    searchObj = ((searchObj != null && typeof searchObj === 'object')? searchObj : {});
    // get all articles that are not from user itself and matches the search
    db.query('SELECT * FROM article WHERE user !=? AND buyer IS NULL AND title LIKE ? AND description LIKE ? AND category LIKE ? AND price <= ?', [
        user, '%' + (searchObj.title || '') + '%', '%' + (searchObj.description || '') + '%', 
        '%' + (searchObj.category || '') + '%', parseFloat(searchObj.price) ||9999
    ], (err, queryRes) => callback(err, queryRes));
};

/**
 * Retrieves articles from database that were created from user
 * @param {String} user the user id
 * @param {Function} callback callback function
 */
let getSoldArticles = (user, callback) => {
    db.query('SELECT * FROM article WHERE user=?', [user], (err, queryRes) => callback(err, queryRes));
};

/**
 * Retrieves article from database for given article id
 * @param {String} article the article id
 * @param {Function} callback callback function
 */
let getArticle = (article, callback) => {
    db.query('SELECT * FROM article WHERE id=?', [article], (err, queryRes) => callback(err, queryRes));
};

/**
 * Buys given article
 * NOTE: User can only buy not own created articles and articles, that aren't bought from others
 * @param {String} user the user id
 * @param {String} article the article id
 * @param {Function} callback callback function
 */
let buyArticle = (user, article, callback) => {
    // get the article
    getArticle(article, (err, articleRes) => {
        // check if article exists, is available and is not from the user itself
        if(!err && articleRes && articleRes[0] && articleRes[0].user !== user && !articleRes[0].buyer) {
            // set the buyer reference
            db.query('UPDATE article SET buyer=? WHERE id=?', [user, article], (err, queryRes) => callback(err, queryRes));
        } else callback(err || srv_error.INVALID_PARAM, null);
    })
};

/**
 * Deletes article from database for given article id
 * NOTE: User can only remove articles created by themself
 * @param {String} user the user id
 * @param {String} article the article id
 * @param {Function} callback callback function
 */
let deleteArticle = (user, article, callback) => {
    db.query('DELETE FROM article WHERE user =? AND id=?', [user, article], (err, queryRes) => callback(err, queryRes));
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
    },
    /**
     * getArticles request handler
     * @param {Object} req the server request
     * @param {Object} res the server response
     */
    getArticles: (req, res) => {
        // check if authenticated
        if(req.session.authenticated) {
            // get articles with may given search filters
            getArticles(req.session.authenticated, {
                title: req.query.title,
                description: req.query.description,
                category: req.query.category,
                price: req.query.price
            }, (err, articlesRes) => {
                if(!err && articlesRes) res.json({articles: articlesRes});
                else res.status(409).json({error: {code: 409, message: err}});
            });
        } else res.status(401).json({error: {code: 401, message: srv_error.UNAUTHORIZED}});
    },
    /**
     * getSoldArticles request handler
     * @param {Object} req the server request
     * @param {Object} res the server response
     */
    getSoldArticles: (req, res) => {
        // check if authenticated
        if(req.session.authenticated) {
            // get articles that were created / sold from user
            getSoldArticles(req.session.authenticated, (err,soldArticlesRes) => {
                if(!err && soldArticlesRes) res.json({articles: soldArticlesRes});
                else res.status(409).json({error: {code: 409, message: err}});
            });
        } else res.status(401).json({error: {code: 401, message: srv_error.UNAUTHORIZED}});
    },
    /**
     * getArticle request handler
     * @param {Object} req the server request
     * @param {Object} res the server response
     */
    getArticle: (req, res) => {
        // check if authenticated
        if(req.session.authenticated) {
            // validate params
            if(parseInt(req.query.id)) {
                getArticle(req.query.id, (err, articleRes) => {
                    if(!err && articleRes) res.json({article: articleRes});
                    else res.status(409).json({error: {code: 409, message: err}});
                });
            } else res.status(422).json({error: {code: 422, message: srv_error.INVALID_PARAM}});
        } else res.status(401).json({error: {code: 401, message: srv_error.UNAUTHORIZED}});
    },
    /**
     * buyArticle request handler
     * @param {Object} req the server request
     * @param {Object} res the server response
     */
    buyArticle: (req, res) => {
        // check if authenticated
        if(req.session.authenticated) {
            // validate params
            if(parseInt(req.body.id)) {
                buyArticle(req.session.authenticated, req.body.id, (err, buyRes) => {
                    if(!err && buyRes) res.json({bought: true});
                    else res.status(409).json({error: {code: 409, message: err}});
                });
            } else res.status(422).json({error: {code: 422, message: srv_error.INVALID_PARAM}});
        } else res.status(401).json({error: {code: 401, message: srv_error.UNAUTHORIZED}});
    },
    /**
     * deleteArticle request handler
     * @param {Object} req the server request
     * @param {Object} res the server response
     */
    deleteArticle: (req, res) => {
        // check if authenticated
        if(req.session.authenticated) {
            // validate params
            if(parseInt(req.query.id)) {
                deleteArticle(req.session.authenticated, req.query.id, (err, deleteRes) => {
                    if(!err && deleteRes) res.json({deleted: (deleteRes.affectedRows > 0)});
                    else res.status(409).json({error: {code: 409, message: err}});
                });
            } else res.status(422).json({error: {code: 422, message: srv_error.INVALID_PARAM}});
        } else res.status(401).json({error: {code: 401, message: srv_error.UNAUTHORIZED}});
    }
};