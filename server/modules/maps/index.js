var srv_error = require('./../../srv_error.json'),
    db = require('./../db'),
    request = require('request');

/**
 * Retrieves address from given article id and resolves the latitude and longitude as well as distance from given position
 * @param {Number} article the article id
 * @param {Object} curPos position object containing latitude and longitude
 * @param {Function} callback callback function
 */
let getLocation = (article, curPos, callback) => {
    let articleObj, positionObj;

    // get the article first
    db.query('SELECT zipcode, city, street FROM user INNER JOIN article ON article.user=user.id WHERE article.id=?', [article], (err, articleRes) => {
        if(!err && articleRes && (articleObj = articleRes[0]) != null) {
            // ensure valid string
            articleObj.zipcode = ((typeof articleObj.zipcode === 'string')? articleObj.zipcode : '');
            articleObj.city = ((typeof articleObj.city === 'string')? articleObj.city : '');
            articleObj.street = ((typeof articleObj.street === 'string')? articleObj.street : '');
            // geocode request
            request({
                uri: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + 
                    articleObj.zipcode + '+' + articleObj.city.replace(/ß/g, 'ss') + '+' + articleObj.street.replace(/ß/g, 'ss') + 
                    '&key=AIzaSyB3KGXhLPC7PghbiWmf3O9PkLsFZNlU68g',
                method: 'GET',
                timeout: 10000,
                followRedirect: true,
                maxRedirects: 10
            }, (err, resp, body) => {
                if(!err && body) {
                    try {
                        body = JSON.parse(body); // parse the response
                        if(body.results && body.results[0] && body.results[0].geometry && body.results[0].geometry.location) {
                            // attach the latitude and longitude
                            positionObj = {lat: body.results[0].geometry.location.lat || 0, lng: body.results[0].geometry.location.lng || 0};
                            // calculate the distance between current position and the resolved location
                            // distance matrix request
                            request({
                                uri: 'https://maps.googleapis.com/maps/api/distancematrix/json?units=metrics&origins=' + 
                                    curPos.lat + ',' + curPos.lng + '&destinations=' + positionObj.lat + ',' + positionObj.lng + 
                                    '&key=AIzaSyB3KGXhLPC7PghbiWmf3O9PkLsFZNlU68g',
                                method: 'GET',
                                timeout: 10000,
                                followRedirect: true,
                                maxRedirects: 10
                            }, (err, resp, body) => {
                                if(!err && body) {
                                    try {
                                        body = JSON.parse(body); // parse the response
                                        if(body.rows && body.rows[0] && body.rows[0].elements && body.rows[0].elements[0] && body.rows[0].elements[0].distance != null) {
                                            // attach the distance
                                            positionObj.distance = body.rows[0].elements[0].distance.text || '0km';
                                            callback(null, positionObj);
                                        } else callback(err || srv_error.LOCATION_NOT_RESOLVED, null);
                                    } catch(e) {callback(e, null);}
                                } else callback(err, null);
                            });
                        } else callback(err || srv_error.LOCATION_NOT_RESOLVED, null);
                    } catch (e) {callback(e, null);}
                } else callback(err, null);
            });
        } else callback(err || srv_error.INVALID_PARAM, null);
    });
};

module.exports = {
    /**
     * getLocation request handler
     * @param {Object} req the server request
     * @param {Object} res the server response
     */
    getLocation: (req, res) => {
        // check if authenticated
        if(req.session.authenticated) {
            if(parseInt(req.query.article) && parseFloat(req.query.lat) && parseFloat(req.query.lng)) {
                getLocation(req.query.article, {lat: req.query.lat, lng: req.query.lng}, (err, locationObj) => {
                    if(!err && locationObj != null) res.json(locationObj);
                    else res.status(409).json({error: {code: 409, message: err}});
                });
            } else res.status(422).json({error: {code: 422, message: srv_error.INVALID_PARAM}});
        } else res.status(401).json({error: {code: 401 ,message: srv_error.UNAUTHORIZED}}); 
    }
};