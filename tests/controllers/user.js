const chai = require('chai');
const server = require('../../app');
const constants = require('../constants/constants');
const assertArrays = require('chai-arrays');
const person = require('../../app/models').person;
const db = require('../../app/models');

chai.use(assertArrays);
const expect = chai.expect;

describe('/User test', () => {
  describe('/user POST', () => {
    before('create user', done => {
      db.sequelize
        .query('SET FOREIGN_KEY_CHECKS = 0')
        .then(result => db.sequelize.sync({ force: true }))
        .then(() => db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1'))
        .then(() => done());
    });
    it('Should succeed inserting a single user in the DB.', done => {
      chai
        .request(server)
        .post('/user')
        .send(constants.singleUserData)
        .then(response => {
          expect(response.status).to.be.equal(200);
          expect(response.body)
            .to.have.property('name')
            .and.to.be.a('string')
            .and.to.equal('Carolina');
          expect(response.body)
            .to.have.property('last_name')
            .and.to.be.a('string')
            .and.to.equal('Alarcon');
          expect(response.body)
            .to.have.property('id')
            .and.to.be.a('string')
            .and.to.equal('192837465');
          expect(response.body)
            .to.have.property('mail')
            .and.to.be.a('string')
            .and.to.equal('caro@gmail.com');
          expect(response.body)
            .to.have.property('phone')
            .and.to.be.a('string')
            .and.to.equal('12647894');
          done();
        });
    });
    it('Should fail because the user already exists.', done => {
      chai
        .request(server)
        .post('/user')
        .send(constants.singleUserData)
        .then(response => {
          expect(response.status).to.be.equal(400);
          expect(response.body)
            .to.have.property('message')
            .and.to.be.a('string')
            .and.to.equal('User with the input ID already exists');
          expect(response.body)
            .to.have.property('internal_code')
            .and.to.be.a('string')
            .and.to.equal('BAD_REQUEST');
          done();
        });
    });
    it('Should fail because of missing body elements.', done => {
      chai
        .request(server)
        .post('/user')
        .send(constants.userMissingFields)
        .then(response => {
          expect(response.status).to.be.equal(400);
          expect(response.body)
            .to.have.property('message')
            .and.to.be.array();
          expect(response.body.message[2])
            .to.have.property('msg')
            .and.to.be.a('string')
            .and.to.equal('Body must contain name. Name must contain between 1 and 50 characters');
          expect(response.body.message[2])
            .to.have.property('param')
            .and.to.be.a('string')
            .and.to.equal('name');
          expect(response.body.message[2])
            .to.have.property('location')
            .and.to.be.a('string')
            .and.to.equal('body');
          expect(response.body)
            .to.have.property('internal_code')
            .and.to.be.a('string')
            .and.to.equal('BAD_REQUEST');
          done();
        });
    });
    it('Should fail because id is longer than allowed.', done => {
      chai
        .request(server)
        .post('/user')
        .send(constants.idExcessOfCharacters)
        .then(response => {
          expect(response.status).to.be.equal(400);
          expect(response.body)
            .to.have.property('message')
            .and.to.be.array();
          expect(response.body.message[0])
            .to.have.property('value')
            .and.to.be.a('string')
            .and.to.equal('1928374657899641231465');
          expect(response.body.message[0])
            .to.have.property('msg')
            .and.to.be.a('string')
            .and.to.equal('Body must contain id. id must contain between 1 and 20 characters');
          expect(response.body.message[0])
            .to.have.property('param')
            .and.to.be.a('string')
            .and.to.equal('id');
          expect(response.body.message[0])
            .to.have.property('location')
            .and.to.be.a('string')
            .and.to.equal('body');
          expect(response.body)
            .to.have.property('internal_code')
            .and.to.be.a('string')
            .and.to.equal('BAD_REQUEST');
          done();
        });
    });
  });

  describe('/user PATCH', () => {
    before('Create user', done => {
      db.sequelize
        .query('SET FOREIGN_KEY_CHECKS = 0')
        .then(result => db.sequelize.sync({ force: true }))
        .then(() => db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1'))
        .then(() => person.create(constants.singleUserData))
        .catch(error => {
          return error;
        })
        .then(() => done());
    });
    it('Should succeed updating a single user in the DB.', done => {
      chai
        .request(server)
        .patch('/user')
        .send(constants.singleUserDataUpdate)
        .then(response => {
          expect(response.status).to.be.equal(200);
          expect(response.body)
            .to.have.property('updated')
            .to.be.a('number')
            .and.to.equal(1);
          done();
        });
    });
    it('Should fail updating a single user in the DB because did not find any changes to be comitted.', done => {
      chai
        .request(server)
        .patch('/user')
        .send(constants.singleUserDataUpdate)
        .then(response => {
          expect(response.status).to.be.equal(404);
          expect(response.body)
            .to.have.property('message')
            .and.to.be.a('string')
            .and.to.equal('The user that was input to update does not exist or no changes were commited');
          expect(response.body)
            .to.have.property('internal_code')
            .and.to.be.a('string')
            .and.to.equal('NOT_FOUND');
          done();
        });
    });
    it('Should fail because of missing body elements.', done => {
      chai
        .request(server)
        .patch('/user')
        .send(constants.singleUserDataUpdateMissingFields)
        .then(response => {
          expect(response.status).to.be.equal(400);
          expect(response.body)
            .to.have.property('message')
            .and.to.be.array();
          expect(response.body.message[2])
            .to.have.property('msg')
            .and.to.be.a('string')
            .and.to.equal('Body must contain id. id must contain between 1 and 20 characters');
          expect(response.body.message[2])
            .to.have.property('param')
            .and.to.be.a('string')
            .and.to.equal('id');
          expect(response.body.message[2])
            .to.have.property('location')
            .and.to.be.a('string')
            .and.to.equal('body');
          expect(response.body)
            .to.have.property('internal_code')
            .and.to.be.a('string')
            .and.to.equal('BAD_REQUEST');
          done();
        });
    });
    it('Should fail because id is longer than allowed.', done => {
      chai
        .request(server)
        .patch('/user')
        .send(constants.singleUserDataUpdateIDTooLong)
        .then(response => {
          expect(response.status).to.be.equal(400);
          expect(response.body)
            .to.have.property('message')
            .and.to.be.array();
          expect(response.body.message[0])
            .to.have.property('value')
            .and.to.be.a('string')
            .and.to.equal('1928374613245678975313487987894631318678643134878131785');
          expect(response.body.message[0])
            .to.have.property('msg')
            .and.to.be.a('string')
            .and.to.equal('Body must contain id. id must contain between 1 and 20 characters');
          expect(response.body.message[0])
            .to.have.property('param')
            .and.to.be.a('string')
            .and.to.equal('id');
          expect(response.body.message[0])
            .to.have.property('location')
            .and.to.be.a('string')
            .and.to.equal('body');
          expect(response.body)
            .to.have.property('internal_code')
            .and.to.be.a('string')
            .and.to.equal('BAD_REQUEST');
          done();
        });
    });
  });

  describe('/userBatch POST', () => {
    before('create user', done => {
      db.sequelize
        .query('SET FOREIGN_KEY_CHECKS = 0')
        .then(result => db.sequelize.sync({ force: true }))
        .then(() => db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1'))
        .then(() => done());
    });
    it('Should succeed inserting several users in the DB.', done => {
      chai
        .request(server)
        .post('/userBatch')
        .send(constants.usersBatch)
        .then(response => {
          expect(response.status).to.be.equal(200);
          expect(response.body).to.be.array();
          expect(response.body[0])
            .to.have.property('name')
            .and.to.be.a('string')
            .and.to.equal('Sebastian');
          expect(response.body[0])
            .to.have.property('last_name')
            .and.to.be.a('string')
            .and.to.equal('Alarcon');
          expect(response.body[0])
            .to.have.property('id')
            .and.to.be.a('string')
            .and.to.equal('1');
          expect(response.body[0])
            .to.have.property('mail')
            .and.to.be.a('string')
            .and.to.equal('sebastian@gmail.com');
          expect(response.body[0])
            .to.have.property('phone')
            .and.to.be.a('string')
            .and.to.equal('6014002');
          expect(response.body[1])
            .to.have.property('name')
            .and.to.be.a('string')
            .and.to.equal('Carolina');
          expect(response.body[1])
            .to.have.property('last_name')
            .and.to.be.a('string')
            .and.to.equal('Alarcon');
          expect(response.body[1])
            .to.have.property('id')
            .and.to.be.a('string')
            .and.to.equal('2');
          expect(response.body[1])
            .to.have.property('mail')
            .and.to.be.a('string')
            .and.to.equal('caro@gmail.com');
          expect(response.body[1])
            .to.have.property('phone')
            .and.to.be.a('string')
            .and.to.equal('12647894');
          expect(response.body[2])
            .to.have.property('name')
            .and.to.be.a('string')
            .and.to.equal('Diego');
          expect(response.body[2])
            .to.have.property('last_name')
            .and.to.be.a('string')
            .and.to.equal('Alarcon');
          expect(response.body[2])
            .to.have.property('id')
            .and.to.be.a('string')
            .and.to.equal('3');
          expect(response.body[2])
            .to.have.property('mail')
            .and.to.be.a('string')
            .and.to.equal('diego@gmail.com');
          expect(response.body[2])
            .to.have.property('phone')
            .and.to.be.a('string')
            .and.to.equal('12647894');
          expect(response.body[3])
            .to.have.property('name')
            .and.to.be.a('string')
            .and.to.equal('Patricia');
          expect(response.body[3])
            .to.have.property('last_name')
            .and.to.be.a('string')
            .and.to.equal('Ochoa');
          expect(response.body[3])
            .to.have.property('id')
            .and.to.be.a('string')
            .and.to.equal('4');
          expect(response.body[3])
            .to.have.property('mail')
            .and.to.be.a('string')
            .and.to.equal('patricia@gmail.com');
          expect(response.body[3])
            .to.have.property('phone')
            .and.to.be.a('string')
            .and.to.equal('12647894');
          done();
        });
    });
    it('Should fail because one of the users already exists.', done => {
      chai
        .request(server)
        .post('/userBatch')
        .send(constants.usersBatch)
        .then(response => {
          expect(response.status).to.be.equal(400);
          expect(response.body)
            .to.have.property('message')
            .and.to.be.a('string')
            .and.to.equal('User with the input ID already exists');
          expect(response.body)
            .to.have.property('internal_code')
            .and.to.be.a('string')
            .and.to.equal('BAD_REQUEST');
          done();
        });
    });
    it('Should fail because of missing fields.', done => {
      chai
        .request(server)
        .post('/userBatch')
        .send(constants.batchMissingFields)
        .then(response => {
          expect(response.status).to.be.equal(400);
          expect(response.body)
            .to.have.property('message')
            .and.to.be.array();
          expect(response.body.message[0])
            .to.have.property('msg')
            .and.to.be.a('string')
            .and.to.equal('Invalid value');
          expect(response.body.message[0])
            .to.have.property('param')
            .and.to.be.a('string')
            .and.to.equal('[0].name');
          expect(response.body.message[0])
            .to.have.property('location')
            .and.to.be.a('string')
            .and.to.equal('body');
          expect(response.body)
            .to.have.property('internal_code')
            .and.to.be.a('string')
            .and.to.equal('BAD_REQUEST');
          done();
        });
    });
    it('Should fail because of excesive length on body.', done => {
      chai
        .request(server)
        .post('/userBatch')
        .send(constants.batchExcesiveLength)
        .then(response => {
          expect(response.status).to.be.equal(400);
          expect(response.body)
            .to.have.property('message')
            .and.to.be.array();
          expect(response.body.message[0])
            .to.have.property('value')
            .and.to.be.a('string')
            .and.to.equal('123456789012345678978945632');
          expect(response.body.message[0])
            .to.have.property('msg')
            .and.to.be.a('string')
            .and.to.equal('Body must contain id. id must contain between 1 and 20 characters');
          expect(response.body.message[0])
            .to.have.property('param')
            .and.to.be.a('string')
            .and.to.equal('[0].id');
          expect(response.body.message[0])
            .to.have.property('location')
            .and.to.be.a('string')
            .and.to.equal('body');
          expect(response.body)
            .to.have.property('internal_code')
            .and.to.be.a('string')
            .and.to.equal('BAD_REQUEST');
          done();
        });
    });
  });

  describe('/user GET', () => {
    before('Create user', done => {
      db.sequelize
        .query('SET FOREIGN_KEY_CHECKS = 0')
        .then(result => db.sequelize.sync({ force: true }))
        .then(() => db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1'))
        .then(() => person.create(constants.singleUserData))
        .catch(error => {
          return error;
        })
        .then(() => done());
    });

    it('Should succeed, found user with requested ID.', done => {
      chai
        .request(server)
        .get('/user?id=192837465')
        .then(response => {
          expect(response.status).to.be.equal(200);
          expect(response.body)
            .to.have.property('name')
            .and.to.be.a('string')
            .and.to.equal('Carolina');
          expect(response.body)
            .to.have.property('last_name')
            .and.to.be.a('string')
            .and.to.equal('Alarcon');
          expect(response.body)
            .to.have.property('id')
            .and.to.be.a('string')
            .and.to.equal('192837465');
          expect(response.body)
            .to.have.property('mail')
            .and.to.be.a('string')
            .and.to.equal('caro@gmail.com');
          expect(response.body)
            .to.have.property('phone')
            .and.to.be.a('string')
            .and.to.equal('12647894');
          done();
        });
    });
    it('Should fail because did not find user with requested ID.', done => {
      chai
        .request(server)
        .get('/user?id=123456789')
        .then(response => {
          expect(response.status).to.be.equal(404);
          expect(response.body)
            .to.have.property('message')
            .and.to.be.a('string')
            .and.to.equal('User not found');
          expect(response.body)
            .to.have.property('internal_code')
            .and.to.be.a('string')
            .and.to.equal('NOT_FOUND');
          done();
        });
    });
    it('Should fail because did not find query param "id" in url.', done => {
      chai
        .request(server)
        .get('/user')
        .then(response => {
          expect(response.status).to.be.equal(400);
          expect(response.body)
            .to.have.property('message')
            .and.to.be.array();
          expect(response.body.message[0])
            .to.have.property('msg')
            .and.to.be.a('string')
            .and.to.equal('query must contain id');
          expect(response.body.message[0])
            .to.have.property('param')
            .and.to.be.a('string')
            .and.to.equal('id');
          expect(response.body.message[0])
            .to.have.property('location')
            .and.to.be.a('string')
            .and.to.equal('query');
          expect(response.body)
            .to.have.property('internal_code')
            .and.to.be.a('string')
            .and.to.equal('BAD_REQUEST');
          done();
        });
    });
    it('Should fail because "id" query param is too short.', done => {
      chai
        .request(server)
        .get('/user?id=')
        .then(response => {
          expect(response.status).to.be.equal(400);
          expect(response.body)
            .to.have.property('message')
            .and.to.be.array();
          expect(response.body.message[0])
            .to.have.property('value')
            .and.to.be.a('string')
            .and.to.equal('');
          expect(response.body.message[0])
            .to.have.property('msg')
            .and.to.be.a('string')
            .and.to.equal('Id should be at least 10 chars long and maximum of 50 chars');
          expect(response.body.message[0])
            .to.have.property('param')
            .and.to.be.a('string')
            .and.to.equal('id');
          expect(response.body.message[0])
            .to.have.property('location')
            .and.to.be.a('string')
            .and.to.equal('query');
          expect(response.body)
            .to.have.property('internal_code')
            .and.to.be.a('string')
            .and.to.equal('BAD_REQUEST');
          done();
        });
    });
  });
});
