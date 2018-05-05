var chai = require('chai'),
    chaiHttp = require('chai-http'),
    srv_config = require('./../../srv_config.json'),
    srv_error = require('./../../srv_error.json'),
    RESTURL = 'http://127.0.0.1:' + srv_config.PORT + '/',
    should = chai.should();

// init chai with chai-http support
chai.use(chaiHttp);

/**
 * Test for register request
 */
describe('register request', () => {
    /**
     * Register request test for missing parameters
     * @param {Function} done callback function
     */
    it('register request with missing parameters', done => {
        chai.request(RESTURL).post('register').set('content-type', 'application/json').send().end((err, res) => {
            should.not.exist(err);
            should.exist(res);
            res.should.have.status(422);
            res.should.be.json;
            res.should.have.property('body');
            res.body.should.have.property('error').to.be.an('object');
            res.body.error.should.have.property('code').equal(422);
            res.body.error.should.have.property('message').equal(srv_error.INVALID_PARAM);
            done();
        });
    });
});