var srv_error = require('./../../srv_error.json'),
    request = require('request');

/**
 * Gets location (latitude and longitude) from given address
 * @param {String} zipcode the zip code
 * @param {String} city the city
 * @param {String} street the street
 * @param {Function} callback callback function
 */
let getLocation = (zipcode, city, street, callback) => {
    // geocode request
    request({
        uri: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + zipcode + '+' + city.replace(/ß/g, 'ss') + '+' + street.replace(/ß/g, 'ss') + '&key=AIzaSyB3KGXhLPC7PghbiWmf3O9PkLsFZNlU68g',
        method: 'GET',
        timeout: 10000,
        followRedirect: true,
        maxRedirects: 10
    }, (err, resp, body) => {
        if(!err && body) {
            try {
                body = JSON.parse(body); // parse the response
                if(body.results && body.results[0] && body.results[0].geometry && body.results[0].geometry.location) {
                    // send the latitude and longitude
                    callback(null, {lat: body.results[0].geometry.location.lat || 0, lng: body.results[0].geometry.location.lng || 0});
                } else callback(err || srv_error.LOCATION_NOT_RESOLVED, null);
            } catch (e) {callback(e, null);}
        } else callback(err, null);    
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
            if(typeof req.query.zipcode === 'string' && typeof req.query.city === 'string' && typeof req.query.street === 'string') {
                getLocation(req.query.zipcode, req.query.city, req.query.street, (err, latLng) => {
                    if(!err && latLng != null) res.json({latLng: latLng});
                    else res.status(409).json({error: {code: 409, message: err}});
                });
            } else res.status(422).json({error: {code: 422, message: srv_error.INVALID_PARAM}});
        } else res.status(401).json({error: {code: 401 ,message: srv_error.UNAUTHORIZED}}); 
    }
};