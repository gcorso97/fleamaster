var srv_error = require('./../../srv_error.json'),
    db = require('./../db');

/**
 * Retrieves dashboard information for current user
 * NOTE: Fetches the total count of bought and sold products and retrieves a random purchasable article
 * @param {String} user the user id
 * @param {Function} callback callback function
 */
let getDashboardInfo = (user, callback) => {
    // retrieve total bought products
    db.query('SELECT COUNT(*) AS bought FROM article WHERE user !=? AND buyer=?', [user, user], (err, boughtRes) => {
        if (!err && boughtRes) {
            // retrieve total sold products
            db.query('SELECT COUNT(*) AS sold FROM article WHERE user=?', [user], (err, soldRes) => {
                if (!err && soldRes) {
                    // retrieve random article
                    db.query('SELECT * FROM article WHERE user !=? AND buyer IS NULL ORDER BY RAND() LIMIT 1', [user], (err, randomRes) => {
                        if (!err && randomRes) {
                            callback(null, {
                                bought: ((boughtRes[0])? boughtRes[0].bought || 0 : 0), 
                                sold: ((soldRes[0])? soldRes[0].sold || 0 : 0),
                                article: randomRes[0] || {}
                            });
                        } else callback(err, null);
                    });
                } else callback(err, null);
            });
        } else callback(err, null);
    });
};

/**
 * Dashboard module
 */
module.exports = {
    /**
     * getDashboardInfo request handler
     * @param {Object} req the server request
     * @param {Object} res the server response
     */
    getDashboardInfo: (req, res) => {
        // check if authenticated
        if (req.session.authenticated) {
            getDashboardInfo(req.session.authenticated, (err, dashboardRes) => {
                if(!err && dashboardRes) res.json(dashboardRes);
                else res.status(409).json({error: {code: 409, message: err}});
            });
        } else res.status(401).json({error: {code: 401 ,message: srv_error.UNAUTHORIZED}});
    }
};