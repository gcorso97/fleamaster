var srv_config = require('./../../srv_config.json'),
    srv_error = require('./../../srv_error.json'),
    mysql = require('mysql'),
    db = mysql.createPool({
        host: srv_config.DB_HOST,
        user: srv_config.DB_USER,
        password: srv_config.DB_PWD,
        database: srv_config.DB_DBNAME
    });
/**
 * Database module
 */
module.exports = {
    /**
     * Queries the database with given SQL query and paramaters
     * NOTE: Automatically parametrizes the query to prevent SQL injection
     * @example 
     * db.query('SELECT * FROM foo WHERE bar=?', ['foobar'], (err, dbRes) => {
     *  console.log(err, dbRes);
     * });
     * @param {String} sql the sql string to query (with ? as paramater placeholder)
     * @param {Array} params the params to replace within the sql string (order is important!)
     * @param {Function} callback callback function
     */
    query: (sql, params, callback) => {
        if(typeof sql === 'string' && Array.isArray(params)) {
            var querySQL = mysql.format(sql, params);

            db.query(querySQL, (err, queryRes) => {
                if(srv_config.DEBUG) console.log(((err)? 'ERROR SQL: ' + err : querySQL));
                callback(err, queryRes);
            });
        } else if(typeof callback === 'function') callback(srv_error.INVALID_PARAM, null);
    }
};