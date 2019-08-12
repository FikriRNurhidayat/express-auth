process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../src/server.js');
const should = chai.should();
const expect = chai.expect();
const User = require('../../src/models/user.js');
const faker = require('faker');
const jwt = require('jsonwebtoken');

chai.use(chaiHttp);

beforeEach(done => {
  User.deleteMany({})
    .then(() => {
      done();
    });
});

afterEach(done => {
  User.deleteMany({})
    .then(() => {
      done();
    })
})

describe('Users API', () => {

  let password = faker.internet.password();
  const userData = {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: password,
    password_confirmation: password
  };

  context('Registration', () => {
  
    it("Should create new user", done => {
      chai
        .request(server)
        .post('/api/users')
        .send(userData)
        .end((err, res) => {
            res.should.have.status(201);
            res.body.success.should.equal(true);
            res.body.data.should.be.a('string');
          done();
        })
    });
    

    it("Should not create identical user", done => {
      User.create(userData)
        .then(data => {  
          chai
            .request(server)
            .post('/api/users')
            .send(userData)
            .end((err, res) => {
                res.should.have.status(422);
                res.body.success.should.equal(false);
                res.body.errors.should.be.a('string');
              done();
            });
        });
    });


    it("Should not create if password and its confirmation are not equal", done => {
      let anotherUserData = Object.create(userData);
      anotherUserData.password_confirmation = faker.lorem.words;
      chai
        .request(server)
        .post('/api/users')
        .send(anotherUserData)
        .end((err, res) => {
            res.should.have.status(422);
            res.body.success.should.equal(false);
            res.body.errors.should.equal("Password should have matched!");
          done();
        });
    });

  })
})