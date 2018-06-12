var chai = require('chai'),
    chaiHttp = require('chai-http'),
    srv_config = require('./../../srv_config.json'),
    srv_error = require('./../../srv_error.json'),
    RESTURL = 'http://127.0.0.1:' + srv_config.PORT + '/',
    db = require('./../../modules/db');
    should = chai.should();

// init chai with chai-http support
chai.use(chaiHttp);

/**
 * Deletes the test user created from this test
 */
before('delete the test user', (done) => {
    db.query('DELETE FROM user WHERE mail=?', ['mail@test.de'], (err, queryRes) => {
        should.not.exist(err);
        done();
    });
});

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

    /**
     * Register request test for invalid mail
     * @param {Function} done callback function
     */
    it('reqister request with invalid mail', done => {
        chai.request(RESTURL).post('register').set('content-type', 'application/json').send(
            {user: {mail: 'invalidMail', password: 'password'}}
        ).end((err, res) => {
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

    /**
     * Register request test for invalid password
     * @param {Function} done callback function
     */
    it('reqister request with invalid password', done => {
        chai.request(RESTURL).post('register').set('content-type', 'application/json').send(
            {user: {mail: 'mail@test.de', password: 'test'}}
        ).end((err, res) => {
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

    /**
     * Register request test for valid data
     * @param {Function} done callback function
     */
    it('reqister request with valid data', done => {
        chai.request(RESTURL).post('register').set('content-type', 'application/json').send(
            {user: {mail: 'mail@test.de', password: 'password'}}
        ).end((err, res) => {
            should.not.exist(err);
            should.exist(res);
            res.should.have.status(200);
            res.should.be.json;
            res.should.have.property('body');
            res.body.should.not.have.property('error');
            res.body.should.have.property('authenticated').to.be.above(0);
            done();
        });
    });

    /**
     * Register request test for same account twice
     * @param {Function} done callback function
     */
    it('reqister request for same account twice', done => {
        chai.request(RESTURL).post('register').set('content-type', 'application/json').send(
            {user: {mail: 'mail@test.de', password: 'password'}}
        ).end((err, res) => {
            should.not.exist(err);
            should.exist(res);
            res.should.have.status(409);
            res.should.be.json;
            res.should.have.property('body');
            res.body.should.have.property('error').to.be.an('object');
            res.body.error.should.have.property('code').equal(409);
            res.body.error.should.have.property('message').equal(srv_error.ALREADY_REGISTERED);
            done();
        });
    });
});

/**
 * Test for login request
 */
describe('login request', () => {

    /**
     * Login request test for missing parameters
     * @param {Function} done callback function
     */
    it('login request with missing parameters', done => {
        chai.request(RESTURL).post('login').set('content-type', 'application/json').send().end((err, res) => {
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

    /**
     * Login request test for invalid mail
     * @param {Function} done callback function
     */
    it('login request with invalid mail', done => {
        chai.request(RESTURL).post('login').set('content-type', 'application/json').send(
            {mail: 'invalidMail', password: 'password'}
        ).end((err, res) => {
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

    /**
     * Login request test for invalid mail
     * @param {Function} done callback function
     */
    it('login request with invalid password', done => {
        chai.request(RESTURL).post('login').set('content-type', 'application/json').send(
            {mail: 'mail@test.de', password: 'test'}
        ).end((err, res) => {
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

    /**
     * Login request test for valid password length but invalid credentials
     * @param {Function} done callback function
     */
    it('login request test for valid password length but invalid credentials', done => {
        chai.request(RESTURL).post('login').set('content-type', 'application/json').send(
            {mail: 'mail@test.de', password: 'password2'}
        ).end((err, res) => {
            should.not.exist(err);
            should.exist(res);
            res.should.have.status(409);
            res.should.be.json;
            res.should.have.property('body');
            res.body.should.have.property('error').to.be.an('object');
            res.body.error.should.have.property('code').equal(409);
            res.body.error.should.have.property('message').equal(srv_error.INVALID_CREDENTIALS);
            done();
        });
    });

    /**
     * Login request test for user that does not exists
     * @param {Function} done callback function
     */
    it('login request test for user that does not exists', done => {
        chai.request(RESTURL).post('login').set('content-type', 'application/json').send(
            {mail: 'mail2@test.de', password: 'password'}
        ).end((err, res) => {
            should.not.exist(err);
            should.exist(res);
            res.should.have.status(409);
            res.should.be.json;
            res.should.have.property('body');
            res.body.should.have.property('error').to.be.an('object');
            res.body.error.should.have.property('code').equal(409);
            res.body.error.should.have.property('message').equal(srv_error.USER_NOT_EXISTS);
            done();
        });
    });

    /**
     * Login request test for valid account
     * @param {Function} done callback function
     */
    it('login request test for valid account', done => {
        chai.request(RESTURL).post('login').set('content-type', 'application/json').send(
            {mail: 'mail@test.de', password: 'password'}
        ).end((err, res) => {
            should.not.exist(err);
            should.exist(res);
            res.should.have.status(200);
            res.should.be.json;
            res.should.have.property('body');
            res.body.should.not.have.property('error');
            res.body.should.property('authenticated').to.be.above(0);
            done();
        });
    });
});

/**
 * Test for logout request
 */
describe('logout request', () => {

    /**
     * Logout request test
     * @param {Function} done callback function
     */
    it('logout request test', done => {
        chai.request(RESTURL).post('logout').set('content-type', 'application/json').send(
        ).end((err, res) => {
            should.not.exist(err);
            should.exist(res);
            res.should.have.status(200);
            res.should.be.json;
            res.should.have.property('body');
            res.body.should.not.have.property('error');
            res.body.should.property('loggedOut').to.be.equal(true);
            done();
        });
    });
});
