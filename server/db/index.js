var srv_config = require('./../srv_config.json'),
    srv_error = require('./../srv_error.json'),
    mysql = require('mysql'),
    db = mysql.createPool({
        host: srv_config.DB_HOST,
        user: srv_config.DB_USER,
        password: srv_config.DB_PWD,
        database: srv_config.DB_DBNAME
    });

module.exports = {
    getPool: () => {
        return db;
    },
    query: (sql, params, callback) => {
        if(typeof sql === 'string' && Array.isArray(params)) {
            db.query(mysql.format(sql, params), (err, queryRes) => {
                callback(err, queryRes);
            });
        } else if(typeof callback === 'function') callback(srv_error.INVALID_PARAM, null);
    }
};