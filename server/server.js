var express = require('express'),
    app = express(),
    srv_config = require('./srv_config.json'),
    srv_error = require('./srv_error.json'),
    cors = require('cors'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    mysql = require('mysql'),
    account = require('./account');

// session handling
app.use(session({
    secret: srv_config.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false   // for non-https only!
    }
}));

// JSON parsing
app.use(bodyParser.json()); // JSON-encoded body
app.use(bodyParser.urlencoded({extended: true}));   // url-encoded body

// Cross-Origin-Resource-Sharing (CORS)
app.use(cors({
    credentials: true, 
    origin: (origin, callback) => {
        if(!origin || origin === 'null') origin = '*';
        callback(null, origin);
    }
}));

// default headers
app.use((req, res, next) => {
    res.contentType('application/json');
    res.setHeader('Access-Control-Allow-Origin', ((req.get('origin') == null || req.get('origin') === 'null')? '*' : req.get('origin') || '*'));
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

// request routes
app.post('/register', account.register);
app.post('/login', account.login);

// requested route not found
app.use((req, res) => {
    res.status(404).json({error: {code: 404, message: srv_error.UNKNOWN_ROUTE}});
});

// error handling
app.use(function onError(err, req, res, next) {
    res.status(500).json({
        error: {
            code: ((err && err.code)? err.code : 500),
            message: ((srv_config.DEBUG && err && typeof err.message === 'string')? err.message : srv_error.INTERNAL_ERROR)
        }
    });
    next(err);
});

// server init
app.listen(srv_config.PORT, () => {
    console.log('Server listening on port ' + srv_config.PORT);
});