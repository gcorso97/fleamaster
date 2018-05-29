var passwordHash = require('password-hash'),
    crypto = require('crypto'),
    srv_error = require('./../../srv_error.json'),
    db = require('./../db').getPool();

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
                        callback(err, ((!err)? true : false));
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
    db.query('SELECT pwd_hash FROM user WHERE mail=?', [mail], (err, queryRes) => {
        if(!err && queryRes && queryRes.length) {
            // compare password
            if(passwordHash.verify(password, queryRes[0].pwd_hash)) callback(null, true);
            else callback(srv_error.INVALID_CREDENTIALS, null);
        } else callback(((err)? err : srv_error.USER_NOT_EXISTS), null);
    });
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
            register(req.body.user, (err, registered) => {
                // start authenticated session if no error
                if(!err && registered) res.json({authenticated: req.session.authenticated = true});
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
            login(req.body.mail, req.body.password, (err, loggedIn) => {
                // start authenticated session if no error
                if(!err && loggedIn) res.json({authenticated: req.session.authenticated = true});
                else res.status(409).json({error: {code: 409, message: err}});
            });
        } else res.status(409).json({error: {code: 422, message: srv_error.INVALID_PARAM}});
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
    }
};