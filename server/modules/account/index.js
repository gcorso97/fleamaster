var passwordHash = require('password-hash'),
    crypto = require('crypto'),
    srv_error = require('./../../srv_error.json'),
    db = require('./../db');

/**
 * Validates password
 * @param {String} password the password to validate
 * @returns {Boolean} whether password is valid or not (minimum length of 6 and string)
 */
let isValidPassword = (password) => {
    return (typeof password === 'string' && password.length >= 6);
};

/**
 * Validates given mail
 * @param {String} mail the mail to validate
 * @returns {Boolean} whether mail is valid or not
 */
let isValidMail = (mail) => {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return regex.test(mail);
};

/**
 * Registers new account for given mail within user object
 * @param {Object} userObj the user object to register containing all information about user (incl. mail + password)
 * @param {Function} callback callback function
 */
let register = (userObj, callback) => {
    try {
        var generatedPW = passwordHash.generate(userObj.password, {algorithm: 'sha512'});

        // search for may existing account
        db.query('SELECT mail FROM user WHERE mail=?', [userObj.mail], (err, queryRes) => {
            if(!err && queryRes) {
                if(queryRes.length) callback(srv_error.ALREADY_REGISTERED, null);   // user already registered
                else {
                    // register user
                    db.query('INSERT INTO user (firstname, lastname, city, zipcode, street, mail, pwd_hash) ' + 
                    'VALUES (?, ?, ?, ?, ?, ?, ?)', [userObj.firstname, userObj.lastname, userObj.city, userObj.zipcode, userObj.street, userObj.mail, generatedPW], (err, queryRes) => {
                        callback(err, ((!err && queryRes)? queryRes.insertId : false));
                    });
                }
            } else callback(srv_error.DB_QUERY, null);
        });
    } catch(e) {
        callback(srv_error.HASH_FAILED, null);
    }
};

/**
 * Login for user (hashed and compares password with the saved one)
 * @param {String} mail the mail to use for login
 * @param {String} password the password of the user account
 * @param {Function} callback callback function
 */
let login = (mail, password, callback) => {
    // search for existing account
    db.query('SELECT id, pwd_hash FROM user WHERE mail=?', [mail], (err, queryRes) => {
        if(!err && queryRes && queryRes.length) {
            // compare password
            if(passwordHash.verify(password, queryRes[0].pwd_hash)) callback(null, queryRes[0].id);
            else callback(srv_error.INVALID_CREDENTIALS, null);
        } else callback(((err)? err : srv_error.USER_NOT_EXISTS), null);
    });
};

/**
 * Retrieves user from database for given user id
 * @param {String} user the user id
 * @param {Function} callback callback function
 */
let getUser = (user, callback) => {
    // search for user
    db.query('SELECT id, firstname, lastname, city, zipcode, street, mail FROM user WHERE id=?', [user], (err, queryRes) => callback(err, queryRes));
};

/**
 * Updates the current user within database with the new data
 * @param {String} user the user id
 * @param {Object} userObj the user object containing the new data to apply
 * @param {Function} callback callback function
 */
let updateUser = (user, userObj, callback) => {
    // update the user
    db.query('UPDATE user SET firstname=?, lastname=?, city=?, zipcode=?, street=?, mail=? WHERE id=?', [
        userObj.firstname, userObj.lastname, userObj.city, userObj.zipcode, userObj.street, userObj.mail, user
    ], (err, queryRes) => callback(err, queryRes));
};

/**
 * Changes the password for the given user
 * @param {String} user the user id
 * @param {String} password the new password to set
 * @param {Function} callback callback function
 */
let changePassword = (user, password, callback) => {
    try {
        // generate new hash for the given new password and update it within the database
        db.query('UPDATE user SET pwd_hash=? WHERE id=?', [passwordHash.generate(password, {algorithm: 'sha512'}), user], (err, queryRes) => callback(err, queryRes));
    } catch(e) {callback(srv_error.HASH_FAILED, null);}
};

/**
 * Account module
 */
module.exports = {
    /**
     * Register request handler
     * @param {Object} req the server request
     * @param {Object} res the server reponse
     */
    register: (req, res) => {
        // validate params
        if(req.body.user && isValidMail(req.body.user.mail) && isValidPassword(req.body.user.password)) {
            register(req.body.user, (err, userId) => {
                // start authenticated session if no error
                if(!err && userId) res.json({authenticated: req.session.authenticated = userId});
                else res.status(409).json({error: {code: 409, message: err}});
            });
        } else res.status(422).json({error: {code: 422, message: srv_error.INVALID_PARAM}});
    },
    /**
     * Login request handler
     * @param {Object} req the server request
     * @param {Object} res the server response
     */
    login: (req, res) => {
        // validate params
        if(isValidMail(req.body.mail) && isValidPassword(req.body.password)) {
            login(req.body.mail, req.body.password, (err, userId) => {
                // start authenticated session if no error
                if(!err && userId) res.json({authenticated: req.session.authenticated = userId});
                else res.status(409).json({error: {code: 409, message: err}});
            });
        } else res.status(422).json({error: {code: 422, message: srv_error.INVALID_PARAM}});
    },
    /**
     * Logout request handler
     * @param {Object} req the server request
     * @param {Object} res the server response
     */
    logout: (req, res) => {
        // completely destroy the session
        req.session.destroy(err => {
            if(!err) res.json({loggedOut: true});
            else res.status(409).json({error: {code: 409, message: err}});
        });
    },
    /**
     * getUser request handler
     * @param {Object} req the server request
     * @param {Object} res the server response
     */
    getUser: (req, res) => {
        // check if authenticated
        if(req.session.authenticated) {
            // get current user or given user if applied
            getUser(req.query.id || req.session.authenticated, (err, userRes) => {
                if(!err && userRes) res.json({user: userRes});
                else res.status(409).json({error: {code: 409, message: err}});
            });
        } else res.status(401).json({error: {code: 401, message: srv_error.UNAUTHORIZED}});
    },
    /**
     * updateUser request handler
     * @param {Object} req the server request
     * @param {Object} res the server response
     */
    updateUser: (req, res) => {
        let processUpdate = () => {
            // update the current user data
            updateUser(req.session.authenticated, req.body.user, (err, updateRes) => {
                if(!err && updateRes) {
                    // change the password if a valid password has been applied
                    if(isValidPassword(req.body.user.password)) {
                        // change password
                        changePassword(req.session.authenticated, req.body.user.password, (err, changeRes) => {
                            if(!err && changeRes) res.json({updated: true});
                            else res.status(409).json({error: {code: 409, message: err}});
                        });
                    } else res.json({updated: true});
                } else res.status(409).json({error: {code: 409, message: err}});
            });
        };

        // check if authenticated
        if(req.session.authenticated) {
            // validate params
            if(req.body.user && isValidMail(req.body.user.mail)) {
                // get the user to retrieve previous mail
                getUser(req.session.authenticated, (err, userRes) => {
                    if(!err && userRes && userRes[0]) {
                        // check if mail changed - if to, check if the requested mail exists within system
                        if(userRes[0].mail !== req.body.user.mail) {
                            // check if mail exists
                            db.query('SELECT mail FROM user WHERE mail=?', [req.body.user.mail], (err, mailRes) => {
                                if(!err && mailRes) {
                                    if(mailRes.length) return res.status(409).json({error: {code: 409, message: srv_error.ALREADY_REGISTERED}});
                                    processUpdate();
                                } else res.status(409).json({error: {code: 409, message: err}});
                            });
                        } else processUpdate();
                    } else res.status(409).json({error: {code: 409, message: err}});
                });
            } else res.status(422).json({error: {code: 422, message: srv_error.INVALID_PARAM}});
        } else res.status(401).json({error: {code: 401, message: srv_error.UNAUTHORIZED}});
    }
};
